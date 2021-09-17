import { Command } from '../../util/definitions';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { client } from '../../index';

export default new Command({
    name: 'info',
    description: 'Fetches info on the bot.',
    category: 'bot',
    async execute(interaction: CommandInteraction): Promise<any> {
        const memory = process.memoryUsage().heapUsed / 1048576; // 1024*1024
        let memoryUsage;

        if (memory >= 1024) memoryUsage = `${(memory / 1024).toFixed(2)}GB`;
        else memoryUsage = `${memory.toFixed(2)}MB`;

        const uptime = new Date(client.uptime!);


        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle(`${client.user?.username}#${client.user?.discriminator}`)
            .setDescription('Created with <3 by Beef#5340\nSome help given by Alyxia#2912')
            .addField('Platform', process.platform.charAt(0).toUpperCase() + process.platform.slice(1), true)
            .addField('Memory Usage', memoryUsage, true)
            .addField('Uptime', `${uptime.getDate() - 1}d ${uptime.getHours()}h ${uptime.getMinutes()}m ${uptime.getSeconds()}s`, true)
            .addField('Node Version', `${process.version}`, true)
        
        return await interaction.editReply({ embeds: [embed] });
    }
})