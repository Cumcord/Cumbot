import { Command } from '../../util/definitions';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import general from '../../config/general';

export default new Command({
    name: 'oscillationindaclub',
    description: 'Oscillates code in da club.',
    category: 'developer',
    options: [
        {
            name: 'code',
            description: 'What code should I oscillate?',
            type: 'STRING',
            required: true,
        },
        // {
        //     name: 'silent',
        //     description: 'Whether to oscillate this code silently.',
        //     type: 'BOOLEAN',
        // }
    ],
    async execute(interaction: CommandInteraction): Promise<any> {
        if (!general.users.includes(interaction.user.id)) return await interaction.editReply({ content: '[](https://youtu.be/2CQRFYHt-yA)' })

        const code = interaction.options.get('code')!.value;

        const before = Date.now()
        const evaluated = eval(code!.toString());
        const took = Date.now() - before;

        try {
            const embed = new MessageEmbed()
                .setColor('WHITE')
                .addField('Expression', `\`\`\`js\n${evaluated.toString()}\n\`\`\``)
                .addField('Time', `${took}ms`, true)
                .addField('Callback', `\`${evaluated.toString()}\``, true)
                .addField('TypeOf', typeof evaluated, true);

            return await interaction.editReply({ embeds: [embed] });
        } catch(error) {
            console.log(`An exception was thrown when ${interaction.user.username} tried to evaluate code`, error)
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(':x: Error')
                .setDescription("An exception was thrown.")
                .addField('Expression', `\`\`\`js\n${evaluated.toString()}\n\`\`\``)
                .addField('Exception', `\`\`\`${error}\`\`\``, true);

            return await interaction.editReply({ embeds: [embed] });
        }
    }
});