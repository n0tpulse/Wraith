const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permit')
        .setDescription('permits a user to view a channel')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to permit')
                .setRequired(true)),
    async execute(interaction) {
        //set the permissions of the user mentioned to not be able to view the channel the command was used in
        const channel = interaction.channel;
        const user = interaction.options.getUser('user');
        channel.permissionOverwrites.create(user, {
            ViewChannel: true,
        });
        const embed = new EmbedBuilder()
            .setTitle('Permitted')
            .setDescription(`${user} has been permitted to view this channel`)
            .setColor('BLUE')
        await interaction.reply({ embeds: [embed] });
    }
}
