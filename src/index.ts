//* Cumbot
//? Cumcord's Discord bot.

// Import Discord.JS as a constructor
import * as Discord from 'discord.js';

// Import handlers
import commandHandler from './handlers/command';
import interactionHandler from './handlers/interaction';
import messageHandler from './handlers/message';

import config from './config/bot';
import { clientLog } from './util/logs';

// Make a client from the Discord constructor and define it
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

function parseActivity(content: string): Discord.ActivityType | undefined {
  switch(content) {
    case 'WATCHING':
    case 'PLAYING':
    case 'STREAMING':
    case 'LISTENING':    
    case 'CUSTOM':
    case 'COMPETING':
      return content;
    
    default:
      return undefined;
  }
}

// Run actions when the client is ready
client.once('ready', async () => {
  await commandHandler(client);
  await interactionHandler(client);
  await messageHandler(client);

  // Set activity based on config file
  client.user!.setActivity(config.vanity.activity.value, {
    type: parseActivity(config.vanity.activity.type),
  });

  clientLog('Ready!');
});

// Login with our token
client.login(require('./config/auth').token);
