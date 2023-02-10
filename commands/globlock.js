const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('globlock')
        .setDescription('Locks down the server from being typed in.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const {  guild, member } = interaction;
        const channel = guild.channels.cache.find(channel => channel.name === "audit-log");
        const everyoneRole = interaction.guild.roles.everyone;
        interaction.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: false,
            });
        })
        await interaction.reply('Locked down the server.');

        channel.send({ content: `**Administrator** ${member.displayName} Globally locked the server \`\`${guild.name}\`\`` })
    }
}
