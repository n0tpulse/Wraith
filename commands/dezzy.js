const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dezzy')
        .setDescription('Dezzy is yelling at you!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to yell at')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setTitle('Dezzy is yelling at you!')
            .setDescription(`${user} You are such ana amazing person I love you so so so much thank you for being here!`)
        await interaction.reply({ embeds: [embed] });

    }
};
