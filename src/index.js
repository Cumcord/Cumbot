//* Cumbot
//? Cumcord's Discord bot.

// Import Discord.JS as a constructor
const Discord = require('discord.js');

// Import handlers
const { commandHandler, interactionHandler, messageHandler } = require('./util/handlers');

// Make a client from the Discord constructor and define it
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Add our config to the client
client.config = require('./config/bot');

// Add globals to the client
// Logging
client.logs = require('./util/logs');

// Run actions when the client is ready
client.once('ready', async ready => {
    // Initialise command handler
    await commandHandler.init(client);

    // Initialise interaction handler
    await interactionHandler.init(client);

    // Initialise message handler
    await messageHandler.init(client)

    // Set activity based on config file
    client.user.setActivity(client.config.vanity.activity.value, { type: client.config.vanity.activity.type }); 

    // Log that we're ready to go
    client.logs.clientLog('Ready!');
});

// Login with our token
client.login(require('./config/auth').token);