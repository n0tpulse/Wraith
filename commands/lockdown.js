const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Locks down the channel from being typed in.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDMPermission(false),
    async execute(interaction) {
        const {  guild, member } = interaction;
        const channel = guild.channels.cache.find(channel => channel.name === "audit-log");
        const everyoneRole = interaction.guild.roles.everyone;
        interaction.channel.permissionOverwrites.edit(everyoneRole, {
            SendMessages: false,
        });
        

        await interaction.reply('Locked down the channel.');

        channel.send({ content: `**Administrator** ${member.displayName} Locked down the channel \`\`${interaction.channel}\`\`` })
    }
}