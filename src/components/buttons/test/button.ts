import { ButtonInteraction } from 'discord.js';
import { Button } from '../../../util/definitions';

export default new Button({
    id: 'test',
    ephemeral: true,
    async execute(interaction: ButtonInteraction): Promise<any> {
        return await interaction.editReply(`hello <@${interaction.user.id}>, you clicky da button`);
    }
})