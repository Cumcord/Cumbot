import { Command } from '../../util/definitions';
import { CommandInteraction, MessageEmbed } from 'discord.js';
const fetch = require('node-fetch');

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

        if (!urls) return await interaction.editReply('Sorry, but I couldn\'t find any valid URLs in that message.');

        if (urls.length > 10) urls.length = 10;

        for (const url of urls!) {
            const baseUrlTrailing = url.replace(/\/?$/, '/');
            const manifestUrl = new URL('plugin.json', baseUrlTrailing);

            let corsMode = false;
            let manifestData;
            let manifestJson;

            try {
                // Attempt to download the manifest
                manifestData = await fetch(manifestUrl);
            } catch {
                try {
                    // If it fails, enable cors mode and attempt to download the manifest through the proxy
                    corsMode = true;
                    manifestData = await fetch(corsProxyUrl + manifestUrl);
                } catch(error) {
                    console.log(error);
                    return await interaction.editReply('Oops.');
                }
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

            const embed = new MessageEmbed()
                .setColor('WHITE')
                .setTitle(manifestJson.name)
                .setURL(baseUrlTrailing)
                .addField('Description', manifestJson.description)
                .addField('Author', manifestJson.author, true)
                .addField('License', manifestJson.license, true)
                .setFooter(`Hash: ${manifestJson.hash}`);

            embeds.push(embed);
        }

        if (embeds.length === 0) return await interaction.editReply('The URLs found in that message don\'t look like Cumcord plugins.');

        await interaction.editReply({ embeds: embeds });
    }
})