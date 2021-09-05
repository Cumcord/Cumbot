//* Cumbot
//? Cumcord's Discord bot.

// Import Discord.JS as a constructor
const Discord = require('discord.js');

// Import handlers
const { commandHandler, interactionHandler, messageHandler } = require('./util/handlers');

// Make a client from the Discord constructor and define it
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Add globals to the client

// Config
client.config = require('./config/bot');

// Logging
client.logs = require('./util/logs');

// Run actions when the client is ready
client.once('ready', async ready => {
    await commandHandler.init(client);
    await interactionHandler.init(client);
    await messageHandler.init(client)

    // Set activity based on config file
    client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type }); 

    client.logs.clientLog('Ready!');
});

// Login with our token
client.login(require('./config/auth').token);