import { Command } from "paimon.js";
import { channel_tag, simplify, tag_override } from "../lib/format.js";

export default new Command({
    name: "export overrides",
    description: "export channel permission overrides as a text file",
    options: [
        "b:full* show the full permission string instead of a short name (default: false)",
    ],
    async execute(cmd, full) {
        full ??= false;

        await cmd.deferReply();

        const rows = [];

        for (const channel of cmd.guild.channels.cache.values()) {
            if (!channel) continue;
            if (channel.permissionOverwrites.cache.size == 0) continue;

            rows.push(
                `[${channel_tag[channel.type]}] #${channel.name}${
                    channel.parent ? ` [category: ${channel.parent.name}]` : ""
                }${channel.permissionsLocked ? " [synced]" : ""}`
            );

            for (const entry of channel.permissionOverwrites.cache.values()) {
                rows.push(await tag_override(cmd, entry));

                let any = false;

                for (let [prefix, permissions] of [
                    ["+", entry.allow.toArray()],
                    ["-", entry.deny.toArray()],
                ]) {
                    if (permissions.length == 0) continue;
                    any = true;

                    if (!full) {
                        permissions = permissions.map(
                            (permission) => simplify[permission]
                        );
                    }

                    rows.push(`${prefix} ${permissions.join(", ")}`);
                }

                if (!any) rows.push("(none)");
            }

            rows.push("");
            rows.push("");
        }

        await cmd.editReply({
            files: [
                {
                    attachment: Buffer.from(rows.join("\n")),
                    name: `${new Date().getTime()}-override-export.diff`,
                },
            ],
        });
    },
});
