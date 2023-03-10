const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cfstatus')
        .setDescription('Shows the status of status.cfx.re'),
    async execute(interaction) {

        const apisite = 'https://status.cfx.re/api/v2/status.json';

        const embed = new EmbedBuilder()
            .setTitle('Fetching status...')
            .setDescription('Fetching the status from status.cfx.re')
            .setColor('#aa1107')
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
      

        var status = await fetch(apisite)
            .then(res => res.json())
            .then(json => json.status.description);


            switch(status) {
                case 'All Systems Operational':
                    status = '🟢 All Systems Operational';
                    break;
                case 'Partial System Outage':
                    status = '🟡 Partial Outage';
                    break;
                case 'Major System Outage':
                    status = '🔴 Major Outage';
                    break;
                case 'Maintenance':
                    status = '🟠 Maintenance';
                    break;
                default:
                    status = '🟣 Unknown';
                    break;
            }

            const embed2 = new EmbedBuilder()
            .setTitle('Status')
            .setDescription(`${status}`)
            .setColor('#aa1107')
            .setTimestamp()
            setTimeout(async() => {
            await  interaction.editReply({ embeds: [embed2] })
                }, 5000);

    }
}



