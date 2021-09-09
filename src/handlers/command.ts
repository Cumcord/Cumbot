//* Cumbot
//? Local command handler

//? This file handles reading and registering local command files

import { Client, Collection } from "discord.js";
import path from 'path';
import fs from 'fs';

import { Command } from '../util/definitions'

export const commands = new Collection<string, Command>();

export default async function init(client: Client) {
    const commandFolder = path.join(__dirname, '..dist/', 'commands/');
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${commandFolder}/${folder}`).filter((file) => file.endsWith('.js'))
        
        for (const file of commandFiles) {
            const command = (await import(`${commandFolder}/${folder}/${file}`)).default as Command | undefined;
            commands.set(command.name, command);
        }
    }
    console.log(`Successfully fetched ${commands.values.length} commands.`)

    if (!client.application?.owner) client.application.fetch();


}