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

        const before = Date.now();
        const took = Date.now() - before;
        let evaluated;

        try {
            evaluated = eval(code!.toString());
            const embed = new MessageEmbed()
                .setColor('WHITE')
                .addField('Expression', `\`\`\`js\n${code?.toString()}\n\`\`\``)
                .addField('Callback', `\`\`\`js\n${evaluated}\n\`\`\``,)
                .addField('Time', `${took}ms`, true)
                .addField('TypeOf', typeof evaluated, true);

            return await interaction.editReply({ embeds: [embed] });
        } catch(error) {
            console.log(`An exception was thrown when ${interaction.user.username} tried to evaluate code`, error)
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(':x: Error')
                .setDescription("An exception was thrown.")
                .addField('Expression', `\`\`\`js\n${code?.toString()}\n\`\`\``)
                .addField('Exception', `\`\`\`\n${error}\n\`\`\``, true);

            return await interaction.editReply({ embeds: [embed] });
        }
    }
});