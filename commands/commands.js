//write a discordjs command called commands
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Displays all commands.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commands')
            .setDescription('`/commands` - Displays all commands.\n`/connect` - Provides a connect code to the server.\n`/web` - Displays the link to the website.')
        await interaction.reply({ embeds: [embed] });
    }
};