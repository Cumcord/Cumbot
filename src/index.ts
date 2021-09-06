//* Cumbot
//? Cumcord's Discord bot.

// Import Discord.JS as a constructor
import * as Discord from 'discord.js';

// Import handlers
import commandHandler from './handlers/command';
import interactionHandler from './handlers/interaction';
import messageHandler from './handlers/message';

// Make a client from the Discord constructor and define it
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// Add globals to the client

// Config
client.config = require('./config/bot');

// Logging
client.logs = require('./util/logs');

// Run actions when the client is ready
client.once('ready', async () => {
  await commandHandler(client);
  await interactionHandler(client);
  await messageHandler(client);

  // Set activity based on config file
  client.user.setActivity(client.config.vanity.activity.value, {
    type: client.config.vanity.activity.type,
  });

  client.logs.clientLog('Ready!');
});

// Login with our token
client.login(require('./config/auth').token);
