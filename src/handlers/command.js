const Discord = require('discord.js');
const fs = require('fs')
const path = require('path')

async function init(client) {
    client.localCommands = new Discord.Collection();

    const commandFolder = path.join(__dirname, '../commands/')
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${commandFolder}/${folder}/`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${commandFolder}/${folder}/${file}`);
            client.localCommands.set(command.name, command);
        }
    }

    client.logs.clientLog('Local commands: ' + client.localCommands.map(command => command.name).join(', '))

    // Fetch our application, if not already fetched
    if (!client.application?.owner) client.application?.fetch();

    // Register each command with their properties
    var commandsToRegister = []

    client.localCommands.forEach(command => {
        commandsToRegister.push({
            name: command.name,
            description: command.description,
            options: command.options,
        })
    })

    // Set commands in every server defined in config
    // TODO: Global commands
    client.config.routes.servers.forEach(id => {
        client.guilds.cache.get(id).commands.set(commandsToRegister)
        .catch(console.log())
    })
}

module.exports = { init }