//* Cumbot
//? Cumcord's Discord bot - but this time actually sane!

import * as Discord from 'discord.js';
export const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ] });

import init from './handlers/command';

import auth from './config/auth';

client.on('ready', async () => {
    init();
});

client.login(auth.token);