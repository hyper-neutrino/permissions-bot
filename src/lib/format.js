export function list(array, separator = "and") {
    array = [array].flat().map((x) => x.toString());

    if (array.length == 0) {
        return "[none]";
    } else if (array.length == 1) {
        return array[0];
    } else if (array.length == 2) {
        return array.join(` ${separator} `);
    } else {
        return `${array.slice(0, array.length - 1).join(", ")}, ${separator} ${
            array[array.length - 1]
        }`;
    }
}

export const simplify = {
    CREATE_INSTANT_INVITE: "invite",
    KICK_MEMBERS: "kick",
    BAN_MEMBERS: "ban",
    ADMINISTRATOR: "admin",
    MANAGE_CHANNELS: "manage channels",
    MANAGE_GUILD: "manage server",
    ADD_REACTIONS: "react",
    VIEW_AUDIT_LOG: "audit",
    PRIORITY_SPEAKER: "priority speaker",
    STREAM: "video",
    VIEW_CHANNEL: "view channels",
    SEND_MESSAGES: "send",
    SEND_TTS_MESSAGES: "tts",
    MANAGE_MESSAGES: "manage messages",
    EMBED_LINKS: "embed links",
    ATTACH_FILES: "upload",
    READ_MESSAGE_HISTORY: "message history",
    MENTION_EVERYONE: "ping all",
    USE_EXTERNAL_EMOJIS: "external emojis",
    VIEW_GUILD_INSIGHTS: "insights",
    CONNECT: "connect",
    SPEAK: "speak",
    MUTE_MEMBERS: "mute",
    DEAFEN_MEMBERS: "deafen",
    MOVE_MEMBERS: "move members",
    USE_VAD: "voice activity",
    CHANGE_NICKNAME: "change own nickname",
    MANAGE_NICKNAMES: "manage nicknames",
    MANAGE_ROLES: "manage roles",
    MANAGE_WEBHOOKS: "webhooks",
    MANAGE_EMOJIS_AND_STICKERS: "manage emojis/stickers",
    USE_APPLICATION_COMMANDS: "use commands",
    REQUEST_TO_SPEAK: "request to speak",
    MANAGE_EVENTS: "manage events",
    MANAGE_THREADS: "manage threads",
    CREATE_PUBLIC_THREADS: "create public threads",
    CREATE_PRIVATE_THREADS: "create private threads",
    SEND_MESSAGES_IN_THREADS: "send in threads",
    START_EMBEDDED_ACTIVITIES: "use activites",
    MODERATE_MEMBERS: "moderate (timeout)",
};

export const channel_tag = {
    GUILD_TEXT: "text",
    DM: "dm",
    GUILD_VOICE: "vc",
    GROUP_DM: "gc",
    GUILD_CATEGORY: "cat",
    GUILD_NEWS: "news",
    GUILD_STORE: "store",
    GUILD_NEWS_THREAD: "news thread",
    GUILD_PUBLIC_THREAD: "pub thread",
    GUILD_PRIVATE_THREAD: "priv thread",
    GUILD_STAGE_VOICE: "stage",
    UNKNOWN: "???",
};
