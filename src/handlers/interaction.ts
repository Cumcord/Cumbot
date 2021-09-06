import { Client, Interaction } from 'discord.js';

import { localCommands } from './command';

import { errorLog } from '../util/logs';

export default async function init(client: Client) {
  // Fetch our application, if not already fetched
  if (!client.application?.owner) client.application?.fetch();

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    if (!localCommands.has(interaction.commandName)) return;
    const command = localCommands.get(interaction.commandName);

    // if (command?.ephemeral) {
    //   await interaction.deferReply({ ephemeral: true });
    // } else {
    //   await interaction.deferReply();
    // }

    try {
      await command!.execute(interaction);
    } catch (error) {
      errorLog(error);

      await interaction.editReply({
        content: `Looks like something went wrong. Exception: \n\`\`\`${error}\`\`\``,
      });
    }
  });
}
