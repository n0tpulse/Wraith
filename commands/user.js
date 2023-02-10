const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option => option.setName('target').setDescription('The user you want to get info from.')),
	async execute(interaction) {
		const { options, guild, member } = interaction;
		const target = options.getMember('target');
		await interaction.reply(`This user is ${target}, who joined on **${target.joinedAt}**. Their ID is **${target.id}**. Their highest role is **${target.roles.highest.name}**. They have **${target.roles.cache.size}** roles.`);
	},
};