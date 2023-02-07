const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Embeds are cool!')
        .addStringOption(option =>
            option.setName('embedtitle')
                .setDescription('Embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('embedtext')
                .setDescription('Embed')
                .setRequired(true)),


    async execute(interaction) {
        const setTitle = interaction.options.getString('embedtitle');
        const setText = interaction.options.getString('embedtext');
        const embed = new EmbedBuilder()
            .addFields([
                { name: `**${setTitle}**`, value: `${setText}`, inline: true },
            ])
        await interaction.reply({ embeds: [embed] });
    },
};