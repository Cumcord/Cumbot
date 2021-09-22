//* Cumbot
//? Local command handler

//? This file handles reading and registering local command files

import { ApplicationCommandData, Collection, Interaction } from 'discord.js';
import path from 'path';
import fs from 'fs';

import { Component } from '../util/definitions';

export const components = new Collection<string, Component>();

export default async function init() {
    const before = Date.now();
    const componentFolder = path.join(__dirname, '../', 'components/');
    const componentFolders = fs.readdirSync(componentFolder);

    for (const folder of componentFolders) {
        const componentFiles = fs.readdirSync(path.join(componentFolder, folder)).filter((file) => file.endsWith('.js'));
        
        for (const file of componentFiles) {
            const component = (await import(path.join(componentFolder, folder, file))).default as Component;
            components.set(component.id, component);
        }
    }

    console.log(`Component handler initialised. Took ${Date.now() - before}ms.`)
}