// Inspired by https://github.com/lexisother/LemuriaBot/blob/master/src/core/definitions.ts

import { Interaction, CommandInteractionOption } from "discord.js";

export interface CommandOptions {
    name: string;
    description?: string;
    options: CommandInteractionOption[];
    execute(interaction: Interaction): Promise<Interaction>;
}

export class Command {
    public name: string;
    public description?: string;
    public options: CommandInteractionOption[];

    public execute: (interaction: Interaction) => Promise<Interaction>;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions?.description ?? '';
        this.options = commandOptions.options;
        this.execute = commandOptions.execute;
    }
}