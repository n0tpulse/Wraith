const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unban a user.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false)
		.addStringOption(option =>
            option.setName("target")
                .setDescription('The id of the user to unban')
                .setRequired(true),
		),


	async execute(interaction) {

		const { options, guild, member } = interaction;

		const target = options.getString('target');
		const channel = guild.channels.cache.find(channel => channel.name === "audit-log");

		const errorsArray = [];

		const errorsEmbed = new EmbedBuilder()
			.setAuthor({ name: "Could not unban member" })
			.setColor("Red")


		const successEmbed = new EmbedBuilder()
			.setAuthor({ name: "Member Unbanned" })
			.setColor("Green")
			.setDescription(`**Member:** ${target} Unbanned from guild \`\`${guild.name}\`\``)
			.setFooter({ text: `Unbanned by ${member.displayName}` })
			.setTimestamp();

            interaction.guild.members.unban(target).catch((err) => {
			
                return console.log("Error occoured in unban command: ", err)
            });


		 await channel.send({ embeds: [successEmbed] })
		 await interaction.reply({
			embeds: [successEmbed]
		})


		
	}
}
