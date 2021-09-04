async function init(client) {
    // Fetch our application, if not already fetched
    if (!client.application?.owner) client.application?.fetch();

    // Run code on the interactionCreate event
    client.on('interactionCreate', async interaction => {
        // Check if the interaction is a command before proceeding
        if (!interaction.isCommand()) return;

        // Check if the interaction command name is in our localCommands array before proceeding
        if (!client.localCommands.has(interaction.commandName)) return;

        // If checks pass, fetch the command from our localCommands array and make it a variable
        const command = client.localCommands.get(interaction.commandName);

        // Check if the command has the ephemeral property, and then defer it as specified
        if (command.ephemeral) {
            await interaction.deferReply({ ephemeral: true });
        } else {
            await interaction.deferReply();
        }

        // Finally, attempt to execute the command, and catch errors
        try {
            // Execute, passing in the interaction object
            await command.execute(interaction)
        } catch(error) {
            // Log the error
            client.logs.errorLog(error)
            
            // Notify the user
            await interaction.editReply({ content: `Looks like something went wrong. Exception: \n\`\`\`${error}\`\`\`` })
        }
    })
}

module.exports = { init }