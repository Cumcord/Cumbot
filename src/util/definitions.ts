//* Cumbot
//? TS definitions
// Inspired by https://github.com/lexisother/LemuriaBot/blob/master/src/core/definitions.ts

import { Interaction, ApplicationCommandOptionData, ApplicationCommandType, ActivityOptions, MessageComponentInteraction, ButtonInteraction, SelectMenuInteraction } from 'discord.js';

export interface CommandOptions {
    name: string;
    description?: string;
    category: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    ephemeral?: boolean;
    devOnly?: boolean;
    execute(interaction: Interaction): any;
}

export class Command {
    public name: string;
    public description?: string;
    public category: string;
    public options?: ApplicationCommandOptionData[];
    public type?: ApplicationCommandType;
    public ephemeral?: boolean;
    public devOnly?: boolean;

    public execute: (interaction: Interaction) => any;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.category = commandOptions.category;
        this.options = commandOptions.options;
        this.type = commandOptions.type;
        this.ephemeral = commandOptions.ephemeral;
        this.devOnly =  commandOptions.devOnly;
        this.execute = commandOptions.execute;
    }
}

export interface ButtonOptions {
    id: string;
    type: 'BUTTON' | 'SELECT_MENU';
    execute: (interaction: ButtonInteraction) => any;
}

export class Button {
    public id: string;
    public type: 'BUTTON' | 'SELECT_MENU';
    public execute: (interaction: ButtonInteraction) => any;

    public constructor(buttonOptions: ButtonOptions) {
        this.id = buttonOptions.id;
        this.type = buttonOptions.type;
        this.execute = buttonOptions.execute;
    }
}

export interface SelectMenuOptions {
    id: string;
    type: 'BUTTON' | 'SELECT_MENU';
    execute: (interaction: SelectMenuInteraction) => any;
}

export class SelectMenu {
    public id: string;
    public type: 'BUTTON' | 'SELECT_MENU';
    public execute: (interaction: SelectMenuInteraction) => any;

    public constructor(selectMenuOptions: SelectMenuOptions) {
        this.id = selectMenuOptions.id;
        this.type = selectMenuOptions.type;
        this.execute = selectMenuOptions.execute;
    }
}

export interface ConfigOptions {
    servers: string[];
    users: string[];
    activity: ActivityOptions;
    devActivity: ActivityOptions;
}

export class Config {
    public servers: string[];
    public users: string[];
    public activity: ActivityOptions;
    public devActivity: ActivityOptions;

    public constructor(configOptions: ConfigOptions) {
        this.servers = configOptions.servers;
        this.users = configOptions.users;
        this.activity = configOptions.activity;
        this.devActivity = configOptions.devActivity;
    }
}