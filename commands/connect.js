const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Provides a connect code to the server'),
    async execute(interaction) {
        //Wwrite a button that says "Join Here" and when clicked, it sends the user to the connect codes location
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Join Here!')
                .setStyle(ButtonStyle.Link)
                .setURL('https://cfx.re/join/lbjmv7')
        );

    await interaction.reply({ content: 'Join The server by clicking below!', components: [row] });
}
};