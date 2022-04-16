import db from "../db.js";

await db.init("ignores");

export async function ignore_role(role) {
    db.ignores.findOneAndUpdate(
        { guild: role.guild.id },
        { $addToSet: { roles: role.id } },
        { upsert: true }
    );
}

export async function get_ignores(guild) {
    return new Set(
        (await db.ignores.findOne({ guild: guild.id }))?.roles ?? []
    );
}
