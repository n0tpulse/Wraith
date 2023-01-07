const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a duration.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(options => options
            .setName('target')
            .setDescription('The user to timeout.')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('duration')
            .setDescription('Provide the duration to timeout the user for. (1m, 1h, 1d)')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('reason')
            .setDescription('Provide the reason for the timeout.')
            .setMaxLength(512)
        ),

    async execute(interaction) {

        const { options, guild, member } = interaction;

        const target = options.getMember('target');
        const duration = options.getString('duration');
        const reason = options.getString('reason') || 'No reason provided.';

        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
            .setAuthor({ name: "Could not timeout member due to" })
            .setColor("Red")


        if (!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Member Has most likely left the serveer")],
            ephemeral: true
        })

        if (!ms(duration) || ms(duration) > ms("28d"))
            errorsArray.push("Invalid duration provided.");


        if (!target.manageable || !target.moderatable)
            errorsArray.push("I cannot timeout this member.")

        if (member.roles.highest.position < target.roles.highest.position)
            errorsArray.push("You cannot timeout this member.")

        if (errorsArray.length > 0)
            return interaction.reply({
                embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
                ephemeral: true
            });

        target.timeout(ms(duration), reason).catch((err) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription("Could not timeout member due to an error.")]
            })
            return console.log("Error occoured in timeout command: ", err)
        });

        const successEmbed = new EmbedBuilder()
            .setAuthor({ name: "Member timed out" })
            .setColor("Green")
            .setDescription(`**Member:** ${target}\n**Duration:** ${duration}\n**Reason:** ${reason}`)
            .setFooter({ text: `Timed out by ${member.displayName}` })
            .setTimestamp();


         interaction.reply({
                embeds: [successEmbed]
            })
            const channel = guild.channels.cache.find(channel => channel.id === "Input Channel ID");
            if (!channel) return;
            channel.send({
                embeds: [successEmbed]
            })
    

            

    }
}
