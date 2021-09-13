import { Command } from '../../util/definitions';
import { CommandInteraction, Message } from 'discord.js';

export default new Command({
    name: 'ping',
    description: 'Simple test command.',
    options: [
        {
            name: 'bbbb',
            description: 'eeeee',
            type: 'STRING'
        }
    ],
    execute(interaction: CommandInteraction): any {
        return interaction.editReply('Pong!');
    }
});