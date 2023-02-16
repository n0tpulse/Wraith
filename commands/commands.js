const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Displays all commands.')
        .setDMPermission(false),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commands')
            .setDescription('`/connect` shows a button to join the server\n`/user` shows information about a user\'s account\n`/web` shows the website link')
        await interaction.reply({ embeds: [embed] });
    }
};
