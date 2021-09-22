import { MessageComponentInteraction } from 'discord.js';
import { Component } from '../../util/definitions';

export default new Component({
    id: 'test',
    type: 'BUTTON',
    async execute(interaction: MessageComponentInteraction): Promise<any> {
        if (!interaction.isButton()) return;
        return await interaction.editReply('this is test!');
    }
})