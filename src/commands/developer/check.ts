import { Command } from '../../util/definitions';
import { CommandInteraction, MessageAttachment } from 'discord.js';
import general from '../../config/general';

import fs from 'fs'
import { chromium } from 'playwright';

export default new Command({
    name: 'check',
    description: 'VERY WIP! May not be implemented | Checks if Cumcord injects on a browser of choice.',
    category: 'developer',
    devOnly: true,
    async execute(interaction: CommandInteraction): Promise<any> {
        if (!general.users.includes(interaction.user.id)) return await interaction.editReply({ content: 'Currently, this is permission-locked.' });

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://dev.fosscord.com/app');

        await page.fill(':nth-match(.inputDefault-_djjkz, 1)', 'booper@beeper.com');
        await page.fill(':nth-match(.inputDefault-_djjkz, 2)', 'booperbeeper');
        await page.click(':nth-match(.button-38aScr, 2)');

        await page.screenshot({ path: `check.png` });
        await browser.close();

        const file = new MessageAttachment('./check.png');

        await interaction.editReply({ files: [file] });
        return fs.rmSync('./check.png');
    }
});