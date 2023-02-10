const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { ActivityType } = require('discord.js');
const { request } = require('undici');
const { EmbedBuilder } = require('discord.js');
const { clientId } = require('./config.json');




const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}



//write a client event that sends an embed to a channel when the bot joins a discord
client.once(Events.ClientReady, async(client) => {
	console.log('Ready!');
	const channel = client.channels.cache.get('1060424996943560765');
	const embed = new EmbedBuilder()
		.setTitle('Bot is online!')
		.setDescription('The bot is now online!')
		.setColor('#aa1107')
		.setTimestamp()
	channel.send({ embeds: [embed] });
});







client.once(Events.ClientReady, async(client) => {
	const server = await request('http://45.88.229.114:30120/dynamic.json')
const players = await server.body.json()

		const options = [
			{
			type: ActivityType.Watching,
			name: `${players.clients}/${players.sv_maxclients} players on HorizonRP`,
			status: "dnd"
			},
		
		]

		const random = Math.floor(Math.random() * options.length);
		const activity = options[random];
		client.user.setActivity(activity.name, { type: activity.type });
		setInterval(() => {
			const random = Math.floor(Math.random() * options.length);
			const activity = options[random];
		client.user.setActivity(activity.name, { type: activity.type });
	}, 10000);
	
});




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






client.login(token);