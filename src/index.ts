//* Cumbot
//? Cumcord's Discord bot - but this time actually sane!

import * as Discord from 'discord.js';
const browser = require('os').type() === 'android' ? "Discord Android" : "discord.js";
export const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ], ws: { properties: { $browser: browser } } });

import commandHandler from './handlers/command';
import interactionHandler from './handlers/interaction';

import general from './config/general';
import auth from './config/auth';

client.on('ready', async () => {
    console.log('Client is ready, initialising handlers...');
    await commandHandler();
    await interactionHandler();

    console.log('Setting activity...');
    client.user?.setActivity(general.activity);
});

client.login(auth.token);