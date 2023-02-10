const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Locks down the channel from being typed in.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false),
    async execute(interaction) {
        const everyoneRole = interaction.guild.roles.everyone;
        interaction.channel.permissionOverwrites.edit(everyoneRole, {
            SendMessages: false,
        });
        

        await interaction.reply('Locked down the channel.');
    }
}