//? This file handles message filtering. Yes, this bot does that.

// Import Discord.JS
const Discord = require('discord.js');

async function init(client) {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        let included;

        if (message.content.includes('cumcord')) included = message.content.indexOf('cumcord'); else return;

        included = message.content.substr(included, "cumcord".length);

        if(/cumCord/g.test(included) === false) {
            message.reply('There is no lowercase C at the start. \"cumCord\"');
        }
    })
}

module.exports = { init }