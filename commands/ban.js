const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a specific user.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false)
		.addUserOption(options => options
			.setName('target')
			.setDescription('The user to Ban.')
			.setRequired(true)
		)
		.addStringOption(options => options
			.setName('reason')
			.setDescription('Provide the reason for the Ban')
			.setMaxLength(512)
		),

	async execute(interaction) {
		const { options, guild, member } = interaction;
		const target = options.getMember('target');
		const reason = options.getString('reason') || 'No reason provided.';
		const channel = guild.channels.cache.find(channel => channel.name === "audit-log");
		const errorsArray = [];
		const errorsEmbed = new EmbedBuilder()
			.setAuthor({ name: "Could not Ban member due to" })
			.setColor("Red")

		const userEmbed = new EmbedBuilder()
			.setAuthor({ name: "You have been Banned" })
			.setColor("Green")
			.setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
			.setFooter({ text: `Banned by ${member.displayName}` })
			.setTimestamp();

		const dmFailEmbed = new EmbedBuilder()
			.setAuthor({ name: `Could not send message to user` })
			.setColor("Red")
			.setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
			.setFooter({ text: `Banned by ${member.displayName}` })
			.setTimestamp();

		const successEmbed = new EmbedBuilder()
			.setAuthor({ name: "Member Banned" })
			.setColor("Green")
			.setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
			.setFooter({ text: `Banned by ${member.displayName}` })
			.setTimestamp();


		if (!target) return interaction.reply({
			embeds: [errorsEmbed.setDescription("Member Has most likely left the server")],
			ephemeral: true
		})

		if (!target.manageable || !target.moderatable)
			errorsArray.push("I cannot Ban this member.")

		if (member.roles.highest.position < target.roles.highest.position)
			errorsArray.push("You cannot Ban this member.")

		if (errorsArray.length > 0)
			return interaction.reply({
				embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
				ephemeral: true
			});


			//sending the embeds to the audit logs as well as the user

		channel.send({ embeds: [successEmbed] })

		target.send({ embeds: [userEmbed] }).catch(err => {
			if (err) return; channel.send({ embeds: [dmFailEmbed] })

		})

		interaction.reply({
			embeds: [successEmbed]
		})

		target.ban({ reason: reason }).catch((err) => {
			interaction.reply({
				embeds: [errorsEmbed.setDescription("Could not Ban member due to an error.")]
			})
			return console.log("Error occoured in Ban command: ", err)
		});

	}
}
