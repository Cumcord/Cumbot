import { Command } from '../../util/definitions';
import { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';
const fetch = require('node-fetch');
import blacklist from '../../util/linkblacklist';

// Some of this code is inspired by Cumcord's plugin importer

export default new Command({
    name: 'Search message for plugin',
    type: 'MESSAGE',
    category: 'contextmenu',
    ephemeral: true,
    async execute(interaction: CommandInteraction): Promise<any> {
        const message = interaction.options.getMessage('message');

        const corsProxyUrl = "https://cors.bridged.cc/";
        const urlTest = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

        const urls = message?.content.match(urlTest);
        const embeds = [];
        const buttons = [];

        if (!urls) return await interaction.editReply('Sorry, but I couldn\'t find any valid URLs in that message.');

        if (urls.length > 5) urls.length = 5;

        for (const url of urls!) {
            for (const item in blacklist) {
                if (url?.toString().includes(item)) {
                    return await interaction.editReply('no lol');
                }
            }
            const baseUrlTrailing = url.replace(/\/?$/, '/');
            const manifestUrl = new URL('plugin.json', baseUrlTrailing);

            let manifestData;
            let manifestJson;

            try {
                manifestData = await fetch(corsProxyUrl + manifestUrl);
            } catch(error) {
                console.log(error);
                return await interaction.editReply('Oops.');
            }
    
            if (manifestData.status != 200) {
                continue;
            }
            
            try {
                // Attempt to parse the manifest
                manifestJson = await manifestData.json();
            } catch {
                continue;
            }

            const button = new MessageButton()
                .setLabel(`Install ${manifestJson.name}`)
                .setStyle('LINK')
                .setURL(`https://send.cumcord.com/#${baseUrlTrailing}`)

            const embed = new MessageEmbed()
                .setColor('WHITE')
                .setTitle(manifestJson.name)
                .setURL(`https://send.cumcord.com/#${baseUrlTrailing}`)
                .addField('Description', manifestJson.description)
                .addField('Author', manifestJson.author, true)
                .addField('License', manifestJson.license, true)
                .setFooter(`Hash: ${manifestJson.hash}`);

            embeds.push(embed);
            buttons.push(button);
        }

        if (embeds.length === 0) return await interaction.editReply('The URLs found in that message don\'t look like Cumcord plugins.');

        const row = new MessageActionRow()
            .addComponents(buttons);

        await interaction.editReply({ embeds: embeds, components: [row], });
    }
})