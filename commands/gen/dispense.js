const minecraft = require("../../mongodb/minecraft");
const hulu = require("../../mongodb/hulu");
const nordvpn = require("../../mongodb/nordvpn");
const crunchyroll = require("../../mongodb/crunchyroll");
const spotify = require("../../mongodb/spotify");
const steam = require("../../mongodb/steam");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const api = require("./../../api/shrinkearn.js")

module.exports= { 
  name: "dispense",
  category: "gen",
  description: "gen accounts",
  usage: 'gen <minecraft/hulu/nordvpn/crunchyroll/spotify/steam> <acc>',
  run: async (client, message, args, prefix) => {
  let timeout = 600000; // 10 mins in milleseconds change if you like
  let daily = await db.fetch(`daily_${message.author.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0 && !client.config.owners.some(r => message.author.id === r)) {
    let time = ms(timeout - (Date.now() - daily));
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle("You already dispensed an account")
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription(
        `You can dispense again and collect accounts in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`
      );
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  } else {
    if (!args[0])
      return message.channel.send(
        `Invalid format. Format: ${prefix}dispense <nordvpn/minecraft/hulu/crunchyroll/spotify/steam>. For Example: ${prefix}dispense nordvpn`
      );
    if (args[0] == "minecraft") {
      minecraft.findOne({ name: "minecraft" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        let random = Math.floor(Math.random() * result.acc.length);
        let res = result.acc[random];

     let embed1 = new MessageEmbed()
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('<:minecraft:696310283383341079> Minecraft Account Sent to you! Please check your DM!');
    // Send the embed to the same channel as the message
    message.channel.send(embed1);
  
        let embed = new MessageEmbed()
        
          .setTitle("Minecraft Account:")
         .setAuthor("If the Account Doesn't work please open a ticket!")
          .setDescription(res, true)
          .setThumbnail(
            "https://theme.zdassets.com/theme_assets/2155033/bc270c23058d513de5124ffea6bf9199af7a2370.png"
          )
          .setFooter(
            "https://discord.gg/32eGfcx",
            "https://cdn.discordapp.com/avatars/691203743525371975/39b01dce4c4edc1dd66fa491b23fe830.png?size=256/"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error);
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());

        if (message.channel.DMChannel) {
          message.reply("You are DMing me now!");
        }
      });
    } else if (args[0] == "hulu") {
      hulu.findOne({ name: "hulu" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        let random = Math.floor(Math.random() * result.acc.length);
        let res = result.acc[random];  
        
         let embed1 = new MessageEmbed()
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('<:hulu:693540483028484117> Hulu Account Sent to you! Please check your DM! ');
    message.channel.send(embed1);
        let embed = new MessageEmbed()
         .setAuthor("If the Account Doesn't work please open a ticket!")
          .setTitle("Hulu Account:")
          .setThumbnail(
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpng-5.findicons.com%2Ffiles%2Ficons%2F1253%2Fflurry_extras%2F256%2Fhulu.png&f=1&nofb=1"
          )
          .setDescription(res)
          .setFooter(
            "Thank you for using Elicia!",
            "https://discord.gg/32eGfcx"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error);
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());
      });
    } else if (args[0] == "nordvpn") {
      nordvpn.findOne({ name: "nordvpn" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        
         let random = Math.floor(Math.random() * result.acc.length);
        let res = result.acc[random];
        
        let embed1 = new MessageEmbed()
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('<:nordvpn:696309145644826674> NordVpn Account Sent to you! Please check your DM!');
    // Send the embed to the same channel as the message
        message.channel.send(embed1);
        let embed = new MessageEmbed()
         .setAuthor("If the Account Doesn't work please open a ticket!")
          .setTitle("NordVpn Account:")
          .setThumbnail(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.apksum.com%2F90%2Fcom.nordvpn.android%2F3.17.5%2Ficon.png&f=1&nofb=1"
          )
          .setDescription(res)
          .setFooter(
            "Thank you for using Elicia!",
            "https://discord.gg/32eGfcx"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error);
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());
      });
    } else if (args[0] == "crunchyroll") {
      crunchyroll.findOne({ name: "crunchyroll" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        
        let random = Math.floor(Math.random() * result.acc.length);
        
        let res = result.acc[random];
        
         let embed1 = new MessageEmbed()
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('<:crunchyroll:696309389111328788> Crunchyroll Account Sent to you! Please check your DM!');
    // Send the embed to the same channel as the message
        message.channel.send(embed1);
        let embed = new MessageEmbed()
         .setAuthor("If the Account Doesn't work please open a ticket!")
          .setTitle("Crunchyroll Account:")
          .setThumbnail(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bestvpnrating.com%2Fsites%2Fdefault%2Ffiles%2Fcrunchyroll-logo.png&f=1&nofb=1"
          )
          .setDescription(res)
          .setFooter(
            "Thank you for using Elicia!",
            "https://discord.gg/32eGfcx"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error);
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());
      });
    } else if (args[0] == "steam") {
      steam.findOne({ name: "steam" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        
         let random = Math.floor(Math.random() * result.acc.length);
        
        let res = result.acc[random];
        
        let embed1 = new MessageEmbed()
        
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('<:steam:696309505222246400> Steam Account Sent to you! Please check your DM!');
    // Send the embed to the same channel as the message
        message.channel.send(embed1);
        let embed = new MessageEmbed()
            .setTitle("Steam Account:")
        .setThumbnail("https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png")
         .setAuthor("If the Account Doesn't work please open a ticket!")
          .setDescription(res)
          .setFooter(
            "Thank you for using Elicia!",
            "https://discord.gg/32eGfcx"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error);
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());
      });
    } else if (args[0] == "spotify") {
      spotify.findOne({ name: "spotify" }).then(async result => {
        if (!result || result == [])
          return message.channel.send(
            `An error occured while trying to gen a acc`
          );
        let random = Math.floor(Math.random() * result.acc.length)
         let res = result.acc[random];
        
         let embed1 = new MessageEmbed()
      // Set the title of the field
      .setTitle('Account Sent to you!')
      // Set the color of the embed
      .setColor(`RANDOM`)
      // Set the main content of the embed
      .setDescription('Spotify Account Sent to you! Please check your DM! 💎');
    // Send the embed to the same channel as the message
        message.channel.send(embed1);
        let embed = new MessageEmbed()
        .setAuthor("If the Account Doesn't work please open a ticket!")
          .setDescription(result.acc[random], true)
          .setFooter(
            "Thank you for using Elicia!",
            "https://discord.gg/32eGfcx"
          );
        result.acc.splice(random, 1);
        result.save().catch(console.error); //hey wsp oops
        message.author.send(embed);
        message.author.send("https://www.youtube.com/watch?v=ds2Ynknzqys")
        db.set(`daily_${message.author.id}`, Date.now());
      });
    }
  }
}
  }