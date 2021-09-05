async function init(client) {
    // Fetch our application, if not already fetched
    if (!client.application?.owner) client.application?.fetch();

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (!client.localCommands.has(interaction.commandName)) return;
        const command = client.localCommands.get(interaction.commandName);

        if (command.ephemeral) {
            await interaction.deferReply({ ephemeral: true });
        } else {
            await interaction.deferReply();
        }

        try {
            await command.execute(interaction)
        } catch(error) {
            client.logs.errorLog(error)
            
            await interaction.editReply({ content: `Looks like something went wrong. Exception: \n\`\`\`${error}\`\`\`` })
        }
    })
}

module.exports = { init }