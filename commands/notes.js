//write a command that reads notes from a specific user in notes.json and displays them in an embed
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const fs = require('fs');
module.exports = {
        data: new SlashCommandBuilder()
                .setName('notes')
                .setDescription('Get the notes for a user.')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                .addUserOption(option => option.setName('target').setDescription('The user to get the notes for.')),
        async execute(interaction) {
                const target = interaction.options.getUser('target');
                const embed = new EmbedBuilder()
                        .setTitle("Notes for " + target.tag)
                        .setColor("Blue")
                        .setTimestamp()
                        .setFooter({ text: "Requested by " + interaction.member.displayName })
                const notes = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));
                console.log(notes.target)
                if (notes.target) {
                        embed.setDescription(notes.note);
                } else {
                        embed.setDescription("No notes found for this user.");
                }
                interaction.reply({ embeds: [embed] });
        },
};