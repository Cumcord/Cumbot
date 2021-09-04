// Import Discord.JS
const Discord = require('discord.js');

// Import fs
const fs = require('fs')

// Import path
const path = require('path')

async function init(client) {
    // Make a commands collection
    client.localCommands = new Discord.Collection();

    // Command management
    const commandFolder = path.join(__dirname, '../commands/')
    const commandFolders = fs.readdirSync(commandFolder);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${commandFolder}/${folder}/`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${commandFolder}/${folder}/${file}`);
            client.localCommands.set(command.name, command);
        }
    }

    // Log all local commands
    client.logs.clientLog('Local commands: ' + client.localCommands.map(command => command.name).join(', '))

    // Fetch our application, if not already fetched
    if (!client.application?.owner) client.application?.fetch();

    // Make an array to store info on local commands we've fetched
    var commandsToRegister = []

    // Register each command with their properties
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