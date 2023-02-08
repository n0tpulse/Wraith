//write a discordjs command that locksdown the channel from being typed in 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Locks down the channel from being typed in.'),
    async execute(interaction) {
        const channel = interaction.channel;
        const everyoneRole = interaction.guild.roles.everyone;
        interaction.channel.permissionOverwrites.edit(everyoneRole, {
            SendMessages: true,
        });
        

        await interaction.reply('Unlocked the channel.');
    }
}