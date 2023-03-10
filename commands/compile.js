const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

const { ms } = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('compile')
        .setDescription('Compiles the bot along with ping'),
    async execute(interaction) {

        const client = interaction.client;

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;



        const embed = new EmbedBuilder()
            .setTitle('Compiling...')
            .setDescription('Compiling Sir, please give me a few moments...')
            .setColor('#aa1107')
            .setTimestamp()

        const embed2 = new EmbedBuilder()
            .setTitle('Compiled!')
            .setDescription(`Hello sir, my ping is ${Math.round(client.ws.ping)}  ms and I have been alive for ${uptime} `)
            .setColor('#aa1107')
            .setTimestamp()



        await interaction.reply({ embeds: [embed] });
   

   //wait 5 seconds then edit the reply with embed2
        setTimeout(() => {
            interaction.editReply({ embeds: [embed2] });
        }, 5000);


 }

}