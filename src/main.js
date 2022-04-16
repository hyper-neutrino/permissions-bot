import client from "./client.js";
import config from "./config.js";

process.on("uncaughtException", (error) => {
    console.error(error.stack || error);
});

client.on("ready", async () => {
    console.log("scanner-bot is ready");
});

client.run(config.discord_token);
