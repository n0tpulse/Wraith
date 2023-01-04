const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require("fs");
const { stringify } = require('querystring');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('note')
		.setDescription('Add a note to the user in the database.')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user you want to add a note to.'))
                .addStringOption(option => option.setName('note').setRequired(true).setDescription('The note you want to add to the user.')),
	async execute(interaction) {

	const user1 = interaction.options.getUser('target');
        //make the 2nd interaction option an argument
        const note = interaction.options.getString('note');

        const result = (user1, note);

        //write the result to the file
        fs.appendFileSync('./notes.json', ` \n{ \n"User": "${user1.username}",\n"Note": "${note}" \n},`), (err) => {
                if (err) {
                 console.log(err);
                }
        };



        await interaction.reply(`Note added to ${user1.username}, ${note}`);

        }
        };


        