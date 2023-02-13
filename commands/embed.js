const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Embeds are cool!')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('embedtitle')
                .setDescription('Embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('embedtext')
                .setDescription('Embed')
                .setRequired(true)),

    async execute(interaction) {
        const { options, guild, member } = interaction;
        const setTitle = interaction.options.getString('embedtitle');
        const setText = interaction.options.getString('embedtext');
        const embed = new EmbedBuilder()
            .addFields([
                { name: `**${setTitle}**`, value: `${setText}`, inline: true },
            ])
            .setColor('#df0de7')
            .setTimestamp()
            .setFooter({ text: `Author: ${member.displayName}` })

        await interaction.reply({ embeds: [embed] });
    },
};