const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const {  PermissionFlagsBits} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDescription('Displays all admin commands.')
        .setDMPermission(false),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Admin Commands')
            .setDescription('`/Admin`  Shows all admin commands\n`/ban`  bans a chosen user\n`/unban` unbans a chosen user\n`/count`  Shows active playercount\n`/embed`  Create your own embed\n`/giverole`  Chose a role to give to a user\n`/kick`  kick a user\n`/lockdown`  locks down the channel the command was used in\n`/permit`  permit a user to see the channel the command was ran in\n`/purge`  Purge messages (1 99)\n`/restrict`  Restrict a user from viewing the channel the command was used in\n`/takerole`  Take a role from a user\n`/timeout`  Time out a user for a specific duration\n`/unlock`  Unlock a locked channel\n ')
             await interaction.reply({ embeds: [embed] });

        
    }
};

