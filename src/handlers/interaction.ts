//* Cumbot
//? Interaction handler

import { Interaction } from 'discord.js';

import { client } from '../index';
import { Command } from '../util/definitions';
import { commands } from './command';

// TODO: Other types of interactions
// TODO: Sane typing

export default async function init() {
    const before = Date.now();
    if (!client.application?.owner) client.application?.fetch();

    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand() && !interaction.isContextMenu()) return;
        if (!commands.has(interaction.commandName)) return;

        const command:Command | undefined = commands.get(interaction.commandName);

        if (command!.ephemeral) {
            await interaction.deferReply({ ephemeral: true });
        } else {
            await interaction.deferReply();
        }

        try {
            await command!.execute(interaction)
        } catch(error) {
            console.log('Interaction handler exception:', error);

            await interaction.editReply({ content: `Interaction handler exception: \n\`\`\`${error}\`\`\`` });
        }
    });
    console.log(`Interaction handler initialised. Took ${Date.now() - before}ms.`);
}