//* Cumbot
//? Cumcord's Discord bot - but this time actually sane!

import './util/globals';

import * as Discord from 'discord.js';
const browser = process.platform === 'android' ? "Discord Android" : "discord.js";
export const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ], ws: { properties: { $browser: browser } } });

import commandHandler from './handlers/command';
import interactionHandler from './handlers/interaction';
import componentHandler from './handlers/component';

import general from './config/general';
import auth from './config/auth';

client.on('ready', async () => {
    console.log('Client is ready, initialising handlers...');
    await commandHandler();
    await componentHandler();
    await interactionHandler();

    console.log('Setting activity...');
    client.user?.setActivity(IS_DEV_MODE ? general.devActivity : general.activity);
});

client.login(IS_DEV_MODE ? auth.developer.token : auth.token);