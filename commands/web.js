//write a discordjs command that tells people the link to a website
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('web')
        .setDescription('Provides a link to the website.'),
    async execute(interaction) {
        await interaction.reply('your website link');
    }
};
