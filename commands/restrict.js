const { SlashCommandBuilder, PermissionFlagsBits,  EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restrict')
        .setDescription('Restricts a user from the channel the command was used in')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to restrict')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.channel;
        const user = interaction.options.getUser('user');
        channel.permissionOverwrites.create(user, {
            ViewChannel: false,
        });
        const embed = new EmbedBuilder()
            .setTitle('Restrict')
            .setDescription(`${user} has been restricted from viewing the channel`)
            .setColor('BLUE')
        await interaction.reply({ embeds: [embed] });
    }
}
