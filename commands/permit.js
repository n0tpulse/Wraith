const { SlashCommandBuilder, PermissionFlagsBits,  EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('permit')
        .setDescription('permits a user to view a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to permit')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.channel;
        const user = interaction.options.getUser('user');
        channel.permissionOverwrites.create(user, {
            ViewChannel: true,
        });
        const embed = new EmbedBuilder()
            .setTitle('Permitted User')
            .setDescription(`${user} has been permitted to view this channel`)
            .setColor('BLUE')
        await interaction.reply({ embeds: [embed] });
    }
}
