//* Cumbot
//? Interaction handler

import { ButtonInteraction, Interaction } from 'discord.js';

import { client } from '../index';
import { Command } from '../util/definitions';
import { commands } from './command';
import { buttons, selects } from './component';

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
            console.log('CommandInteraction handler exception:', error);

            await interaction.editReply({ content: `CommandInteraction handler exception: \n\`\`\`${error}\`\`\`` });
        }
    });
    
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isMessageComponent()) return;
        if (!components.has(interaction.customId)) return;

        const component:Component | undefined = components.get(interaction.customId);

        if (component?.type === 'BUTTON' && !interaction.isButton()) return;
        if (component?.type === 'SELECT_MENU') interaction.isSelectMenu();

        await interaction.deferReply();

        try {
            await component?.execute(interaction);
        } catch(error) {
            console.log('MessageComponentInteraction handler exception:', error);

            await interaction.editReply({ content: `MessageComponentInteraction handler exception: \n\`\`\`${error}\`\`\`` });
        }
    });

    console.log(`Interaction handler initialised. Took ${Date.now() - before}ms.`);
}