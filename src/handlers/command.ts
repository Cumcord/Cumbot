import Discord, { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

import { clientLog } from '../util/logs';
import config from '../config/bot'

export const localCommands = new Discord.Collection<string, { name: any; description: any; options: any; execute: any; }>();  

export default async function init(client: Client) {
  const commandFolder = path.join(__dirname, '../commands/');
  const commandFolders = fs.readdirSync(commandFolder);

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`${commandFolder}/${folder}/`)
      .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`${commandFolder}/${folder}/${file}`);
      localCommands.set(command.name, command);
    }
  }

  clientLog(
    'Local commands: ' +
      localCommands.map((command: { name: any }) => command.name).join(', '),
  );

  // Fetch our application, if not already fetched
  if (!client.application?.owner) client.application?.fetch();

  // Register each command with their properties
  var commandsToRegister:
    | Discord.ApplicationCommandData[]
    | { name: any; description: any; options: any }[] = [];

  for(const command of localCommands.values()) {
    commandsToRegister.push({
      name: command.name,
      description: command.description,
      options: command.options,
    });
  };

  // Set commands in every server defined in config
  // TODO: Global commands
  for(const id of config.routes.servers) {
    return client.guilds.cache.get(id)!.commands.set(commandsToRegister);
  };
}
