import { Command } from '../../util/definitions';
import { CommandInteraction, MessageButton, MessageActionRow } from 'discord.js';

export default new Command({
    name: 'docs',
    description: 'READ THE DOCS',
    category: 'utility',
    async execute(interaction: CommandInteraction): Promise<any> {
        const button = new MessageButton()
            .setLabel('READ THE DOCS')
            .setEmoji('888525549394362368')
            .setStyle('LINK')
            .setURL(`https://docs.cumcord.com`);

        const row = new MessageActionRow()
            .addComponents([button, button, button, button, button]);

        return await interaction.editReply({ content: '***READ :clap: THE :clap: DOCS*** ***READ :clap: THE :clap: DOCS*** ***READ :clap: THE :clap: DOCS*** ***READ :clap: THE :clap: DOCS*** ***READ :clap: THE :clap: DOCS*** ', components: [row, row, row, row, row] });
    }
})