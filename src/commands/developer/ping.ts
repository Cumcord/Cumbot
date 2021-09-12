import { Command } from "../../util/definitions";
import { Interaction, Message } from "discord.js";

export default new Command({
    name: "ping",
    description: "Simple test command.",
    options: [
        {
            name: '',
            type: 'STRING'
        }
    ],
    execute(interaction: Interaction): Promise<Message> {
        return interaction.channel!.send("Pong!");
    }
});