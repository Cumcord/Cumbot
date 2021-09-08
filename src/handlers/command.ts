//* Cumbot
//? Local command handler

//? This file handles reading and registering local command files

import { Client, Collection } from "discord.js";
import path from 'path';
import fs from 'fs';

import { Command } from '../util/definitions'

export const commands = new Collection<string, Command>();

export default async function init(client: Client) {
    const commandFolder = path.join(__dirname, '../commands/');
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${commandFolder}/${folder}`).filter((file) => file.endsWith('.ts'))
        
        for (const file of commandFolder) {
            const command = require(`${commandFolder}/${folder}/${file}`);
            commands.set(command.name, command);
        }
    }
}