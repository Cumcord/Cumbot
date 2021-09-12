// Inspired by https://github.com/lexisother/LemuriaBot/blob/master/src/core/definitions.ts

import { Interaction, Message, CommandInteractionOption } from "discord.js";

export interface CommandOptions {
    name: string;
    description: string;
    options?: CommandInteractionOption[];
    execute?(interaction: Interaction): Promise<Message>;
}

export class Command {
    public name: string;
    public description: string;
    public options?: CommandInteractionOption[];

    public execute?: (interaction: Interaction) => Promise<Message>;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.options = commandOptions.options;
        this.execute = commandOptions.execute;
    }
}