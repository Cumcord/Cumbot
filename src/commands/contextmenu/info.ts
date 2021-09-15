import { Command } from '../../util/definitions';
import { CommandInteraction, MessageEmbed, User } from 'discord.js';

function isBot(user: User) {
    if (user.bot === true) return 'Yes'; else return 'No';
}

function isSystem(user: User) {
    if (user.system === true) return 'Yes'; else return 'No';
}

export default new Command({
    name: 'Info',
    category: 'contextmenu',
    type: 'USER',
    ephemeral: true,
    async execute(interaction: CommandInteraction): Promise<any> {
        const user = interaction.options.getUser('user');

        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${user!.username}#${user!.discriminator}`)
            .setThumbnail(user!.avatarURL()!)
            .addField('Flags', (await user!.fetchFlags()).toArray().join() || 'None', true)
            .addField('Bot', isBot(user!), true)
            .addField('System', isSystem(user!), true)
            .setFooter(`ID: ${user!.id}`);

        return await interaction.editReply({ embeds: [embed] });
    }
})