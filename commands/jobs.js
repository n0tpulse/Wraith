const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDescription('Shows the current job names'),
    async execute(interaction) {


        const embed = new EmbedBuilder()
        .setTitle('Job Names')
        .setDescription('ambulance = ems\npolice = LSPD\nautomechanic = foos\nlscustoms = LS Customs\naemech = AE Mechanic Shop\nusedcar =  AE used Car\nflywheels = Flywheels\nburgershot = Burgershot\nvanilla = Vanilla Unicorn\ncardealer = PDM\nautodealer = Ace Autos\njadewok = Jade Wok\ncafeprego = Cafe Prego ')

        interaction.reply({ embeds: [embed] });
    }
}