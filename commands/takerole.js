//write a command to give someone a role defined in a role option

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('takerole')
        .setDescription('Takes a role from a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to take the role from')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to take from the user')
                .setRequired(true)),
                async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);
        member.roles.remove(role);
        await interaction.reply(`Took ${role} from ${user}`);
    }
}