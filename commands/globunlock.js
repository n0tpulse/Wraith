const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('globunlock')
        .setDescription('Unlocks server channels the server from being typed in.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const everyoneRole = interaction.guild.roles.everyone;
        interaction.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: false,
            });
        })
        await interaction.reply('Unlocked the server.');
    }
}
