const { Client, GatewayIntentBits } = require("discord.js");
const { connectMongoDb } = require("./connection");
const { nanoid } = require("nanoid");
const Url = require("./models/url");

connectMongoDb("mongodb://127.0.0.1:27017/short-url-discord");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    const shortId = nanoid(8);
    const data = await Url.findOne({ redirectUrl: url });
    if (data) {
      return message.reply({
        content: "Existing Short ID for: " + url + " is " + data.shortId,
      });
    } else {
      let res = await Url.create({
        shortId: shortId,
        redirectUrl: url,
      });
      return message.reply({
        content: "Generated Short ID for: " + url + " is " + res.shortId,
      });
    }
  }
  message.reply({
    content: "Hi From Bot",
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});

client.login();
