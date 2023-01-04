const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { ActivityType } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, async(client) => {
	console.log('Ready!');
		const options = [
			{
			type: ActivityType.Watching,
			name: 'Pulse code me', 
			status: "online"
			},
			{
			type: ActivityType.Playing,
			name: 'Horizon Roleplay',
			status: "online"
			},
		
		]

		const random = Math.floor(Math.random() * options.length);
		const activity = options[random];
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