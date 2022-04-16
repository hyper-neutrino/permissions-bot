import { Command } from "paimon.js";

export default new Command({
    name: "diagnose find-redundant roles",
    description:
        "find roles whose permissions are a subset of a specified role or @everyone",
    options: ["r:role* the role to compare to"],
    async execute(cmd, role) {
        role ??= cmd.guild.roles.everyone;

        const found = [];

        for (const query of cmd.guild.roles.cache
            .toJSON()
            .sort((x, y) => y.comparePositionTo(x))) {
            if (query.id == role.id || query.name == "@everyone") continue;

            if (query.permissions.toArray().length == 0) continue;

            if (
                (query.permissions.bitfield & role.permissions.bitfield) ==
                query.permissions.bitfield
            ) {
                found.push(query);
            }
        }

        await cmd.reply({
            content:
                found.length == 0
                    ? `No roles have permissions that are a subset of ${role}.`
                    : `The following roles have non-empty permissions but are a subset of ${role}: ${found
                          .map((role) => role.toString())
                          .join(", ")}`,
            allowedMentions: { parse: [] },
        });
    },
});
