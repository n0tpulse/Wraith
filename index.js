const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { ActivityType } = require('discord.js');
const { request } = require('undici');
const { EmbedBuilder } = require('discord.js');




const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}





//bot shows online
client.once(Events.ClientReady, async (client) => {
	console.log('Ready!');
	const channel = client.channels.cache.find(c => c.name === 'audit-log');
	const embed = new EmbedBuilder()
		.setTitle('Bot is online!')
		.setDescription('The bot is now online!')
		.setColor('#aa1107')
		.setTimestamp()
	channel.send({ embeds: [embed] });
});

//bot status
client.once(Events.ClientReady, async (client) => {
	const options = [

		{
			type: ActivityType.Watching,
			name: `HorizonRP`,
			status: "streaming",

		},


	];
	const random = Math.floor(Math.random() * options.length);
	const activity = options[random];
	client.user.setActivity(activity.name, { type: activity.type });
	setInterval(() => {
		const random = Math.floor(Math.random() * options.length);
		const activity = options[random];
		client.user.setActivity(activity.name, { type: activity.type });
	}, 10000);

});


//command handler code
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { url } = require('node:inspector');

//change this role ID 
const ROLES = {
	CIT: '1054652752959115275'
};

client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {
		const role = interaction.guild.roles.cache.get(
			ROLES[interaction.customId.toUpperCase()]
		);

		if (!role)
			return interaction.reply({ content: 'Role not found', ephemeral: true });

		const hasRole = interaction.member.roles.cache.has(role.id);
		if (hasRole)
			return interaction.reply({ content: `You already have the ${role} role`, ephemeral: true })
				.then(() => {
				}).catch(err => {
					console.log(err);
				});



		return interaction.member.roles
			.add(role)
			.then((member) =>
				interaction.reply({ content: `The ${role} role was added to you ${member}`, ephemeral: true, })
					.then(() => {
						const guild = interaction.guild;
						const logChan = guild.channels.cache.find(channel => channel.name === 'audit-log')
						const embed = new EmbedBuilder()
							.setTitle('Role Added')
							.setDescription(`The ${role} role was added to ${member}`)
							.setColor('#aa1107')
							.setTimestamp()

						logChan.send({ embeds: [embed] });
					}).catch(err => {
						console.log(err);
					})

			)


			.catch((err) => {
				console.log(err);
				return interaction.reply({
					content: `Something went wrong. The ${role} role was not added to you ${member}`,
					ephemeral: true,
				});
			});
	}
});

client.login(token);