//write a command to give someone a role defined in a role option

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giverole')
        .setDescription('Gives a user a role.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to give the role to')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to give the user')
                .setRequired(true)),
                async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);
        member.roles.add(role);
        await interaction.reply(`Gave ${user} the role ${role}`);
    }
}