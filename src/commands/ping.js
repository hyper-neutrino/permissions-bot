import { template } from "discord-markdown-embeds";
import { Command } from "paimon.js";

const embed = template(`
---
color: 0xff0099
---
# Pong!
My ping is {ping} ms.
`);

export default new Command({
    name: "ping",
    description: "view the client's ping",
    options: [],
    async execute(cmd) {
        await cmd.reply({
            embeds: embed.render({ commands: { ping: cmd.client.ws.ping } }),
        });
    },
});
