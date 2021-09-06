import Discord, { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export default async function init(client: Client) {
  client.localCommands = new Discord.Collection();

  const commandFolder = path.join(__dirname, '../commands/');
  const commandFolders = fs.readdirSync(commandFolder);

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`${commandFolder}/${folder}/`)
      .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`${commandFolder}/${folder}/${file}`);
      client.localCommands.set(command.name, command);
    }
  }

  client.logs.clientLog(
    'Local commands: ' +
      client.localCommands.map((command: { name: any }) => command.name).join(', '),
  );

  // Fetch our application, if not already fetched
  if (!client.application?.owner) client.application?.fetch();

  // Register each command with their properties
  var commandsToRegister:
    | Discord.ApplicationCommandData[]
    | { name: any; description: any; options: any }[] = [];

  client.localCommands.forEach((command: { name: any; description: any; options: any }) => {
    commandsToRegister.push({
      name: command.name,
      description: command.description,
      options: command.options,
    });
  });

  // Set commands in every server defined in config
  // TODO: Global commands
  client.config.routes.servers.forEach((id) => {
    return client.guilds.cache.get(id)!.commands.set(commandsToRegister);
  });
}
