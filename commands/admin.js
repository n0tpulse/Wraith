//write a command that displays specific commands 
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Displays all admin commands.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Admin Commands')
            .setDescription('`/count` - Shows active player count.\n`/kick` - Kicks a user from the server.\n`/embed` - Makes a message into an embed.\n`/ban` - Bans a user from the server.\n`/timeout` - Times out a user for a specific duration.\n`/purge` - Purges a specified amount of messages.(1-99)\n`/restrict` - Restricts a user from viewing the channel the command was used in.\n`/permit` - permits a user to view the channel the command was used in.\n `/user` - Displays information about a user.\n`/commands` - Displays all commands.\n`/web` - Displays the link to the website.')
             await interaction.reply({ embeds: [embed] });

        
    }
};

