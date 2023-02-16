const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('Get the number of players on the server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Server Player Count")   
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: "Requested by " + interaction.user.tag })
            const server = await request('http://45.88.229.114:30120/dynamic.json')
            const players = await server.body.json()
            embed.setDescription(`There are currently ${players.clients}/${players.sv_maxclients} players on the server.`);
            interaction.reply({ embeds: [embed] });
    },


};
