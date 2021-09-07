//* Cumbot
//? Local command handler

//? This file handles reading and registering local command files

import { Client, Collection } from "discord.js";
import path from 'path';
import fs from 'fs';

export default async function init(client: Client) {
    const localCommands = new Collection();

    const commandFolder = path.join(__dirname, '../commands/');
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${commandFolder}/${folder}`);
        
    }
}