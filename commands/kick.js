const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a specific user.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false)
        .addUserOption(options => options
            .setName('target')
            .setDescription('The user to Kick.')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('reason')
            .setDescription('Provide the reason for the Kick.')
            .setMaxLength(512)
        ),

    async execute(interaction) {
        const { options, guild, member } = interaction;
        const target = options.getMember('target');
        const reason = options.getString('reason') || 'No reason provided.';
        const errorsArray = [];
        const errorsEmbed = new EmbedBuilder()
            .setAuthor({ name: "Could not Kick member due to" })
            .setColor("Red")


        if (!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Member Has most likely left the serveer")],
            ephemeral: true
        })


        if (!target.manageable || !target.moderatable)
            errorsArray.push("I cannot Kick this member.")

        if (member.roles.highest.position < target.roles.highest.position)
            errorsArray.push("You cannot Kick this member.")

        if (errorsArray.length > 0)
            return interaction.reply({
                embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
                ephemeral: true
            });



        const successEmbed = new EmbedBuilder()
            .setAuthor({ name: "Member Kicked" })
            .setColor("Blue")
            .setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
            .setFooter({ text: `Kicked by ${member.displayName}` })
            .setTimestamp();

            const userEmbed = new EmbedBuilder()
			.setAuthor({ name: "You have been Kicked" })
			.setColor("Green")
			.setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
			.setFooter({ text: `Kicked by ${member.displayName}` })
			.setTimestamp();

		const dmFailEmbed = new EmbedBuilder()
			.setAuthor({ name: `Could not send message to user` })
			.setColor("Red")
			.setDescription(`**Member:** ${target}\n**Reason:** ${reason}`)
			.setFooter({ text: `Kicked by ${member.displayName}` })
			.setTimestamp();

        interaction.reply({
            embeds: [successEmbed]
        })

        target.send({ embeds: [userEmbed] }).catch((err) => {
            interaction.followUp({ embeds: [dmFailEmbed] })
            return console.log("Error occoured in Kick command: ")
        })


        const channel = guild.channels.cache.find(channel => channel.name === "audit-log");
		if (!channel) return;
		channel.send({
			embeds: [successEmbed]
		})
        
        target.kick({ reason: reason }).catch((err) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription("Could not Kick member due to an error.")]
            })
            return console.log("Error occoured in Kick command: ", err)
        });
    }
}
