//* Cumbot
//? Interaction handler

import { Interaction } from 'discord.js';

import { client } from '../index';
import { Command, Component } from '../util/definitions';
import { commands } from './command';
import { components } from './component';

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
    
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isMessageComponent()) return;
        if (!components.has(interaction.customId)) return;

        const component:Component | undefined = components.get(interaction.customId);

        await interaction.deferReply();

        try {
            await component?.execute(interaction);
        } catch(error) {
            console.log('Component handler exception:', error);

            await interaction.editReply({ content: `Component handler exception: \n\`\`\`${error}\`\`\`` });
        }
    });
    console.log(`Interaction handler initialised. Took ${Date.now() - before}ms.`);
}