import { Command } from "paimon.js";
import { simplify } from "../lib/format.js";

export default new Command({
    name: "export roles",
    description: "export roles and their permissions as a text file",
    options: [
        "b:exclude-cosmetic* exclude roles with no permissions (default: false)",
        "b:collapse-everyone* show @everyone if a role's permissions match the defaults (default: true)",
        'b:collapse-admin* only show "admin" if a role has the ADMINISTRATOR permission (default: false)',
        "b:full* show the full permission string instead of a short name (default: false)",
    ],
    async execute(cmd, exclude, collapse, collapse_admin, full) {
        exclude ??= false;
        collapse ??= true;
        full ??= false;

        await cmd.deferReply();

        const rows = [];

        const roles = cmd.guild.roles.cache
            .toJSON()
            .sort((x, y) => y.comparePositionTo(x));

        const bitfield = cmd.guild.roles.everyone.permissions;

        const width = Math.max(...roles.map((role) => role.name.length));

        for (const role of roles) {
            let permissions = role.permissions.toArray();
            if (exclude && permissions.length == 0) continue;

            if (
                collapse &&
                role.name != "@everyone" &&
                role.permissions.equals(bitfield)
            ) {
                permissions = ["@everyone"];
            }

            if (collapse_admin && role.permissions.has("ADMINISTRATOR")) {
                permissions = ["ADMINISTRATOR"];
            }

            if (!full) {
                permissions = permissions.map(
                    (permission) => simplify[permission] ?? permission
                );
            }

            rows.push(
                `${role.name.padEnd(width)}: ${
                    permissions.join(", ") || "(none)"
                }`
            );
        }

        await cmd.editReply({
            files: [
                {
                    attachment: Buffer.from(rows.join("\n")),
                    name: `${new Date().getTime()}-role-export.txt`,
                },
            ],
        });
    },
    caller: "MANAGE_ROLES",
});
