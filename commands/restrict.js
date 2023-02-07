const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restrict')
        .setDescription('Restricts a user from the channel the command was used in')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to restrict')
                .setRequired(true)),
    async execute(interaction) {
        //set the permissions of the user mentioned to not be able to view the channel the command was used in
        const channel = interaction.channel;
        const user = interaction.options.getUser('user');
        channel.permissionOverwrites.create(user, {
            ViewChannel: false,
        });
        const embed = new EmbedBuilder()
            .setTitle('Restrict')
            .setDescription(`${user} has been restricted from viewing the channel`)
            .setColor('BLUE')
        await interaction.reply({ embeds: [embed] });
    }
}
