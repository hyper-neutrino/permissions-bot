import { Permissions } from "discord.js";
import { Command } from "paimon.js";

export default [
    new Command({
        name: "sweep clear",
        description: "Clear overrides for a member/role from every channel.",
        options: ["p:target the target to clear"],
        async execute(cmd, target) {
            await cmd.deferReply({ ephemeral: true });

            for (const channel of (await cmd.guild.channels.fetch()).values()) {
                if (channel.permissionsLocked) continue;
                await channel.permissionOverwrites.delete(target);
            }

            await cmd.editReply({
                content: `All overrides for ${target} have been cleared.`,
                allowedMentions: { parse: [] },
            });
        },
        permission: "setting",
    }),

    new Command({
        name: "sweep set",
        description: "Set overrides for a member/role for every channel.",
        options: [
            "p:target the target to set",
            "s:permission! the permission to modify (some of these don't work)",
            ["s:setting permission level", "allow", "unset", "deny"],
        ],
        async execute(cmd, target, permission, setting) {
            await cmd.deferReply({ ephemeral: true });

            const obj = {};
            obj[permission] = {
                allow: true,
                unset: null,
                deny: false,
            }[setting];

            for (const channel of (await cmd.guild.channels.fetch()).values()) {
                if (channel.permissionsLocked) continue;
                await channel.permissionOverwrites.edit(target, obj);
            }

            await cmd.editReply({
                content: `Set \`${permission}\` to \`${setting}\` for ${target} in all channels.`,
                allowedMentions: { parse: [] },
            });
        },
        async autocomplete(_, query) {
            return keys.filter(
                (item) => item.toLowerCase().indexOf(query.toLowerCase()) != -1
            );
        },
        permission: "setting",
    }),
];

const keys = Object.keys(Permissions.FLAGS).sort();
