const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Provides a connect code to the server'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Join Here!')
                .setStyle(ButtonStyle.Link)
                .setURL('Add your Server CFX.re/join Link Here!')
        );

    await interaction.reply({ content: 'Join The server by clicking below!', components: [row] });
}
};
