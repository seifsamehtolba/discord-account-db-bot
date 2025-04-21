const minecraft = require("../../mongodb/minecraft");
const hulu = require("../../mongodb/hulu");
const nordvpn = require("../../mongodb/nordvpn");
const crunchyroll = require("../../mongodb/crunchyroll");
const spotify = require("../../mongodb/spotify");
const steam = require("../../mongodb/steam");
const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
const hastebin = require("hastebin-gen");
const api = require("./../../api/shrinkearn.js");

module.exports= { 
  name: "addgen",
  category: "gen",
  description: "Add accounts",
  usage: 'gen <minecraft/hulu/nordvpn/crunchyroll/spotify/steam> <acc>',
  run: async(client, message, args, prefix) => {

    if(!client.config.owners.some(r => r === message.author.id)) return message.channel.send("You have no access! Please request access from `Flawed#9161`");

    if(!args[0]) return message.channel.send(`Invalid format. Format: ${prefix}addgen <minecraft/hulu/nordvpn/crunchyroll/spotify/steam> <acc>.`);
    if(!args[1]) return message.channel.send(`Invalid format. Format: ${prefix}addgen <minecraft/hulu/nordvpn/crunchyroll/spotify/steam> <acc>.`);
    if(args[0] == "minecraft") {
        minecraft.findOne({name: "minecraft"}).then(async result => {
            let accs = result ? result.acc : [];
           /*args.slice(1)
             .forEach(async r => {
             let res = await hastebin(r, {extention: "txt"})
            accs.push(res); */
          for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
            let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
          }
          /*let res = await hastebin(args[1], {extention: "text"});
          accs.push(res); */
            let newDoc = new minecraft({
                _id: new mongoose.Types.ObjectId(),
                name: 'minecraft',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                minecraft.deleteOne({name: "minecraft"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send("Minecraft Added!") 
        }); 
    }
    else if(args[0] == "hulu") {
        hulu.findOne({name: "hulu"}).then(async result => {
            let accs = result ? result.acc : [];
            for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
            let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
            }
            let newDoc = new hulu({
                _id: new mongoose.Types.ObjectId(),
                name: 'hulu',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                hulu.deleteOne({name: "hulu"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send("Hulu Added!")
        });

    }
    else if(args[0] == "nordvpn") {
        nordvpn.findOne({name: "nordvpn"}).then(async result => {
            let accs = result ? result.acc : [];
           for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
             let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
            }
            let newDoc = new nordvpn({
                _id: new mongoose.Types.ObjectId(),
                name: 'nordvpn',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                nordvpn.deleteOne({name: "nordvpn"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
          message.channel.send("Nordvpn Added!")
        });
    }
    else if(args[0] == "crunchyroll") {
        crunchyroll.findOne({name: "crunchyroll"}).then(async result => {
            let accs = result ? result.acc : [];
            for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
             let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
            }
            let newDoc = new crunchyroll({
                _id: new mongoose.Types.ObjectId(),
                name: 'crunchyroll',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                crunchyroll.deleteOne({name: "crunchyroll"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send(`Crunchyroll Added!`)
        });
    }
  else if(args[0] == "spotify") {
    spotify.findOne({name: "spotify"}).then(async result => {
            let accs = result ? result.acc : [];
            for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
             let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
            }
            let newDoc = new spotify({
                _id: new mongoose.Types.ObjectId(),
                name: 'spotify',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                spotify.deleteOne({name: "spotify"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send(`Done!`)
        });
  }
  else if(args[0] == "steam") {
    steam.findOne({name: "steam"}).then(async result => {
            let accs = result ? result.acc : [];
            for(var i = 1; i < args.length; i++) {
            let data = args[i];
            let Res = await hastebin(data, {extention: "txt"})
             let res = await api.createGen({"tokenAPI": client.config.shrink, "redirectLink": Res})
            accs.push(res);
            }
            let newDoc = new steam({
                _id: new mongoose.Types.ObjectId(),
                name: 'steam',
                acc: accs
            });
            if(!result || result == []) {
                newDoc.save().catch(console.error);
            }else{
                steam.deleteOne({name: "steam"}).catch(console.error);
                newDoc.save().catch(console.error);
            }
            message.channel.send(`Done!`)
        });
  }
}
}