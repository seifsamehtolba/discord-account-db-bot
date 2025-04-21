const minecraft = require("../../mongodb/minecraft");
const hulu = require("../../mongodb/hulu");
const nordvpn = require("../../mongodb/nordvpn");
const crunchyroll = require("../../mongodb/crunchyroll");
const spotify = require("../../mongodb/spotify");
const steam = require("../../mongodb/steam");
const { MessageEmbed } = require("discord.js");
var array = ["minecraft", "steam", "hulu", "nordvpn", "crunchyroll", "spotify"];

module.exports = {
  name: "replace",
  category: "gen",
  description: "Replace a user a gen acc",
  usage: "replace <account type> <@user>",
  run: async(client, message, args, prefix) => {
    if(!args[0] || !args[1]) return message.channel.send(`Invalid format. Format: \`${prefix}replace <nordvpn/minecraft/hulu/crunchyroll/spotify/steam> <@user>\`. For Example: ${prefix}replace nordvpn @user`);
    if(!array.includes(args[0])) return message.channel.send(`Invalid acc name.`);
    const random = args[0];
    const user = message.mentions.users.first();
    if(!user) return message.channel.send(`Mention a proper user`);
    var check;
    if(random === "minecraft") check = await minecraft.findOne({name: "minecraft"});
      if(random === "steam") check = await steam.findOne({name: "steam"});
      if(random === "hulu") check = await hulu.findOne({name: "hulu"});
      if(random === "nordvpn") check = await nordvpn.findOne({name: "nordvpn"});
      if(random === "crunchyroll") check = await crunchyroll.findOne({name: "crunchyroll"});
      if(random === "spotify") check = await spotify.findOne({name: "spotify"})
    
    if(!check || check.acc == []) {
        await message.channel.send(`There are no accounts left with \`${random}\`.`)
        return;
      };
    const rNum = Math.floor(Math.random() * check.acc.length);
    
    user.send(`Here's the account: ${check.acc[rNum]}`).then(async() => {
      check.acc.splice(rNum, 1);
      await check.save().catch(e => e);
      message.channel.send(`Sen't ${user.toString()} the account.`);
    }).catch(err => {
      console.log(err);
      message.channel.send(`Unable to send him/her the account. Please make sure if the user you mentioned has dm enabled.`)
    });
    
    
    
  }
}