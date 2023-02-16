const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('web')
        .setDescription('Provides a link to the website.'),
    async execute(interaction) {
        await interaction.reply('<http://horizon-rp.xyz>');
    }
};
