import { res } from "file-ez";
import { Client, is_string, load_all } from "paimon.js";
import { list } from "./lib/format.js";

export default new Client({
    intents: 3,
    partials: [],
    commands: await load_all(res("./commands")),
    events: await load_all(res("./events")),

    async before(cmd, { caller, mine }) {
        if (!allowed(cmd, caller)) {
            return `You must have the following permission(s): ${list(
                caller,
                "or"
            )}`;
        }

        for (const permission of listify(mine)) {
            if (!cmd.guild.me.permissions.has(permission)) {
                return `I must have all of the following permissions: ${list(
                    mine,
                    "and"
                )}`;
            }
        }
    },

    async before_autocomplete(cmd, { caller }) {
        if (!allowed(cmd, caller)) return [];
    },

    async error(cmd, error) {
        if (is_string(error)) {
            try {
                await cmd.reply({
                    content: error,
                    ephemeral: true,
                });
                return;
            } catch {}
        }

        console.error(`Error in command /${cmd.commandName}`);
        console.error(error.stack || error);
    },
});

function allowed(cmd, caller) {
    if (!caller || caller.length == 0) return true;

    let allowed = false;

    for (const permission of listify(caller)) {
        if (cmd.member.permissions.has(permission)) {
            allowed = true;
            break;
        }
    }

    return allowed;
}

function listify(x) {
    if (x === undefined) return [];
    return [x].flat();
}
