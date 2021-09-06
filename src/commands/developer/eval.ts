import { CommandInteraction, MessageEmbed } from 'discord.js';

module.exports = {
  name: 'oscillationindaclub',
  description: 'Oscillates code in da club.',
  category: 'developer',
  options: [
    {
      name: 'code',
      description: 'What code should I run?',
      type: 'STRING',
      required: true,
    },
  ],
  execute: async (interaction: CommandInteraction) => {
    const client = interaction.client;
    if (interaction) {
      if (!client.config.users.superUsers.includes(interaction.user.id)) {
        return await interaction.editReply({ content: 'https://youtu.be/2CQRFYHt-yA' });
      }
    }

    const toEval = interaction.options.get('code')?.value;

    if (!toEval) return await interaction.editReply("You didn't give any arguments.");

    try {
      const before = Date.now();
      const evaluated = eval(toEval.toString());
      const took = Date.now() - before;

      const embed = new MessageEmbed()
        .setColor('#2F3136')
        .addField('Operation:', `\`\`\`js\n${toEval.toString()}\n\`\`\``)
        .addField(`Time taken:`, `(${took}ms)`, true);

      if (evaluated) {
        embed.addField('Evaluated:', evaluated.toString(), true);
        embed.addField('TypeOf:', typeof evaluated, true);
      }

      return await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      client.logs.errorLog(error);
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Error')
        .setDescription("Sorry, but I couldn't evaluate that.")
        .addField('Operation:', `\`\`\`js\n${toEval.toString()}\n\`\`\``)
        .addField('**Error:**', `\`\`\`${error}\`\`\``, true);

      return await interaction.editReply({ embeds: [embed] });
    }
  },
};

