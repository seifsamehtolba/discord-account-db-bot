const minecraft = require("../../mongodb/minecraft");
const hulu = require("../../mongodb/hulu");
const nordvpn = require("../../mongodb/nordvpn");
const crunchyroll = require("../../mongodb/crunchyroll");
const spotify = require("../../mongodb/spotify");
const steam = require("../../mongodb/steam");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stock",
  category: "gen",
  description: "Informs you about the accounts we have",
  Usage: "stock",
  run:async (client, message, args) => {
  minecraft.findOne({ name: "minecraft" }).then(mc => {
    hulu.findOne({ name: "hulu" }).then(hu => {
      nordvpn.findOne({ name: "nordvpn" }).then(nord => {
        crunchyroll.findOne({ name: "crunchyroll" }).then(crunch => {
          spotify.findOne({ name: "spotify" }).then(spot => {
            steam.findOne({ name: "steam" }).then(async stea => {
              let mcA = mc ? mc.acc.length : "None currently in stock";
              if (mcA === 0) mcA = "None currently in stock";
              let huA = hu ? hu.acc.length : "None currently in stock";
              if (huA === 0) huA = "None currently in stock";
              let nordA = nord ? nord.acc.length : "None currently in stock";
              if (nordA === 0) nordA = "None currently in stock";
              let crunchA = crunch ? crunch.acc.length : "None currently in stock"
              if (crunchA === 0) crunchA = "None currently in stock";
              let spotA = spot ? spot.acc.length : "None currently in stock";
              if (spotA === 0) spotA = "None currently in stock";
              let steaA = stea ? stea.acc.length : "None currently in stock";
              if (steaA === 0) steaA = "None currently in stock";

              const embed = new MessageEmbed()
                // Set the title of the field
                .setTitle("Stock:")
                // Set the color of the embed
                .setColor(`RANDOM`)
                .addField("<:minecraft:696310283383341079> **Minecraft Accounts:**", `**${mcA}**`)
                .addField("<:hulu:693540483028484117> **Hulu Accounts:**", `**${huA}**`)
                .addField("<:nordvpn:696309145644826674> **NordVpn Accounts:**", `**${nordA}**`)
                .addField("<:crunchyroll:696309389111328788> **Crunchyroll Accounts:**", `**${crunchA}**`)
                .addField("<:spotify:696309258785914891> **Spotify Accounts:**", `**${spotA}**`)
                .addField("<:steam:696309505222246400> **Steam Accounts:**", `**${steaA}**`)
                .setDescription("Here is the stock we have this month!");

              // Send the embed to the same channel as the message
              message.channel.send(embed);
            });
          });
        });
      });
    });
  });
}}