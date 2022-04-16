import { Command } from "paimon.js";

export default new Command({
    name: "diagnose shadowed-overrides",
    description:
        'find channel overrides where "allow" overrides may cause "deny" overrides to not work',
    options: [
        "b:show-everyone* show when overrides may shadow @everyone overrides (default: false)",
        "b:no-ignore* set to true to bypass roles that are ignored (/ignore) (default: false)",
    ],
    async execute(cmd, show_everyone, no_ignore) {
        await cmd.deferReply();

        const rows = [];

        if (rows.length == 0) {
            await cmd.editReply("No channel overrides look problematic.");
        } else {
            await cmd.editReply({
                content:
                    "Note that the role hierarchy does **not** matter when it comes to channel overrides. Use `/faq overrides` to see more information.",
                files: [
                    {
                        attachment: Buffer.from(rows.join("\n")),
                        name: `${new Date().getTime()}-shadowed-overrides.diff`,
                    },
                ],
            });
        }
    },
});
