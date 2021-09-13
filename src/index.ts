//* Cumbot
//? Cumcord's Discord bot - but this time actually sane!

import * as Discord from 'discord.js';
export const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ] });

import commandHandler from './handlers/command';
import interactionHandler from './handlers/interaction';

import auth from './config/auth';

client.on('ready', async () => {
    console.log('Client is ready, initialising handlers...')
    await commandHandler();
    await interactionHandler();
});

client.login(auth.token);