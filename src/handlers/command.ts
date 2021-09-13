//* Cumbot
//? Local command handler

//? This file handles reading and registering local command files

import { ApplicationCommandData, Collection } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { client } from '../index';

import { Command } from '../util/definitions'
import general from '../config/general';

export const commands = new Collection<string, Command>();

export default async function init() {
    const commandFolder = path.join(__dirname, '../', 'commands/');
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(commandFolder, folder)).filter((file) => file.endsWith('.ts'));
        
        for (const file of commandFiles) {
            const command = (await import(path.join(commandFolder, folder, file))).default as Command;
            commands.set(command.name, command);
        }
    }
    console.log(`Successfully fetched ${Array.from(commands.values()).length} command(s).`);

    if (!client.application?.owner) client.application?.fetch();
    let commandsToRegister:ApplicationCommandData[] = [];

    for(const command of commands.values()) {
        commandsToRegister.push({
          name: command.name,
          description: command.description,
          options: command.options,
        });
    };

    for (const id of general.servers) {
        client.guilds.cache.get(id)?.commands.set(commandsToRegister);
    }
    console.log('Command handler initialised.')
}