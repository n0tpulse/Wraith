//write a discord.js command that will write the user option and note option into a json file with the user's name and the note. and update each time the command is used for each user
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const fs = require("fs");
const { stringify } = require('querystring');
const { MessageEmbed } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('note')
                .setDescription('Add a note to the user in the database.')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .addUserOption(options => options
                        .setName('target')
                        .setRequired(true)
                        .setDescription('The user you want to add a note to.')
                )
                .addStringOption(options => options
                        .setName('note')
                        .setRequired(true)
                        .setDescription('The note you want to add to the user.')
                ),
        async execute(interaction) {
                const { options, guild, member } = interaction
                const target = options.getMember('target');
                const note = options.getString('note');
                const errorsArray = [];
                const errorsEmbed = new EmbedBuilder()
                        .setAuthor({ name: "Could not add note to member due to" })
                        .setColor("Red")
                if (!target) return interaction.reply({
                        embeds: [errorsEmbed.setDescription("Member Has most likely left the serveer")],
                        ephemeral: true
                })
                if (!target.manageable || !target.moderatable)
                        errorsArray.push("I cannot add a note to this member.")
                if (member.roles.highest.position < target.roles.highest.position)
                        errorsArray.push("You cannot add a note to this member.")
                if (errorsArray.length > 0)
                        return interaction.reply({
                                embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
                                ephemeral: true
                        });
                const noteEmbed = new EmbedBuilder()
                        .setAuthor({ name: `Note Added to ${target.displayName}` })
                        .setColor("Green")
                        .setDescription(`Note: ${note}`)
                        .setFooter({ text: `Added by ${member.displayName}` })
                interaction.reply({ embeds: [noteEmbed] });
                const noteData = {
                        target: target.displayName,
                        ID: target.id,
                        note: note,
                        addedBy: member.displayName
                        //add a line break here

                        
                }

                const noteDataString = JSON.stringify(noteData);
                fs.appendFileSync(`./notes.json`, noteDataString, (err) => {
                        if (err) console.log(err);
                })


        }
}
