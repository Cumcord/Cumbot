import { Command } from '../../util/definitions';
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
const fetch = require('node-fetch');
import blacklist from '../../util/linkblacklist';

// Some of this code is inspired by Cumcord's plugin importer

export default new Command({
    name: 'plugin',
    description: 'Fetches info on a specific plugin.',
    category: 'utility',
    options: [
        {
            name: 'url',
            description: 'What plugin should I fetch info on?',
            type: 'STRING',
            required: true,
        },
    ],
    async execute(interaction: CommandInteraction): Promise<any> {
        const givenURL = interaction.options.get('url')!.value;

        for (const item in blacklist) {
            if (givenURL?.toString().includes(item)) {
                return await interaction.editReply('no lol');
            }
        }

        const urlTest = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        if (urlTest.test(givenURL!.toString()) !== true) {
            return await interaction.editReply('That URL isn\'t valid!');
        }

        const corsProxyUrl = "https://cors.bridged.cc/";

        const baseUrlTrailing = givenURL?.toString().replace(/\/?$/, '/');

        const manifestUrl = new URL("plugin.json", baseUrlTrailing);

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
            return await interaction.editReply('I couldn\'t fetch the manifest for the specified plugin.');
        }
        
        try {
            // Attempt to parse the manifest
            manifestJson = await manifestData.json();
        } catch {
            return await interaction.editReply('I couldn\'t parse the manifest for the specified plugin.');
        }

        const button = new MessageButton()
            .setLabel(`Install ${manifestJson.name}`)
            .setStyle('LINK')
            .setURL(`https://send.cumcord.com/#${baseUrlTrailing!}`);

        const row = new MessageActionRow()
            .addComponents([button]);

        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle(manifestJson.name)
            .setURL(`https://send.cumcord.com/#${baseUrlTrailing!}`)
            .addField('Description', manifestJson.description)
            .addField('Author', manifestJson.author, true)
            .addField('License', manifestJson.license, true)
            .setFooter(`Hash: ${manifestJson.hash}`);

        return await interaction.editReply({ embeds: [embed], components: [row] });
    }
})