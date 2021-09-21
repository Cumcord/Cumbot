import { Command } from '../../util/definitions';
import { CommandInteraction, MessageButton, MessageActionRow, MessageSelectMenu } from 'discord.js';

export default new Command({
    name: 'components',
    description: 'tests components',
    category: 'utility',
    devOnly: true,
    async execute(interaction: CommandInteraction): Promise<any> {
        const button = new MessageButton()
            .setLabel('wewewewewe')
            .setStyle('PRIMARY')
            .setCustomId('button');

        const select = new MessageSelectMenu()
            .addOptions([
                {
                    label: 'Cum',
                    description: 'yes.',
                    emoji: '869240882799443998',
                    value: 'cum',
                },
                {
                    label: 'chalice',
                    description: 'consume.',
                    emoji: '886780955023540235',
                    value: 'chalice',
                },
            ])
            .setPlaceholder('welcome to epcic select menu!!')
            .setCustomId('select');

        const selectRow = new MessageActionRow()
            .addComponents([select]);

        const buttonRow = new MessageActionRow()
            .addComponents([button]);

        return await interaction.editReply({ content: 'here are your clothes', components: [selectRow, buttonRow] });
    }
})