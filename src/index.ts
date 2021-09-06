//* Cumbot
//? Cumcord's Discord bot - but this time actually sane!

import * as Discord from 'discord.js';
const client = new Discord.Client({ intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ] });

import auth from './config/auth';

client.login(auth.token);