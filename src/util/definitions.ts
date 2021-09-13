// Inspired by https://github.com/lexisother/LemuriaBot/blob/master/src/core/definitions.ts

import { Interaction, Message, ApplicationCommandOptionData } from 'discord.js';

export interface CommandOptions {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    ephemeral?: boolean;
    execute(interaction: Interaction): any;
}

export class Command {
    public name: string;
    public description: string;
    public options?: ApplicationCommandOptionData[];
    public ephemeral?: boolean;

    public execute: (interaction: Interaction) => any;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.options = commandOptions.options;
        this.ephemeral = commandOptions.ephemeral;
        this.execute = commandOptions.execute;
    }
}