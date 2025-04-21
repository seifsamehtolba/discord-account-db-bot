const minecraft = require("./../mongodb/minecraft");
const hulu = require("./../mongodb/hulu");
const nordvpn = require("./../mongodb/nordvpn");
const crunchyroll = require("./../mongodb/crunchyroll");
const spotify = require("./../mongodb/spotify");
const steam = require("./../mongodb/steam");
var array = ["minecraft", "steam", "hulu", "nordvpn", "crunchyroll", "spotify"];
const msgCooldown = new Set();
const {MessageEmbed, ReactionCollector} = require("discord.js");
module.exports = async(client, msg) => {
  if(msg.channel.id === "719912151900225606") {
  if(msgCooldown.has(msg.channel.id)) return;
  client.msgCount = client.msgCount + 1
    if(client.msgCount > 100) {
      var random = array[Math.floor(Math.random() * array.length)];
      var reward;
      var check;
      if(random === "minecraft") check = await minecraft.findOne({name: "minecraft"});
      if(random === "steam") check = await steam.findOne({name: "steam"});
      if(random === "hulu") check = await hulu.findOne({name: "hulu"});
      if(random === "nordvpn") check = await nordvpn.findOne({name: "nordvpn"});
      if(random === "crunchyroll") check = await crunchyroll.findOne({name: "crunchyroll"});
      if(random === "spotify") check = await spotify.findOne({name: "spotify"})
      if(!check || check.acc == []) {
        await client.channels.cache.get(client.config.stockLog).send(`Hey @here, There is no accounts left with \`${random}\`.`)
        return;
      }
      const rNum = Math.floor(Math.random() * check.acc.length);
      reward = check.acc[rNum];
      check.acc.splice(rNum, 1);
      await check.save().catch(e => e);
      
      const embed = new MessageEmbed()
        .setAuthor(` | React to this message with 🎉 to win ${random} account! 👀`, msg.guild.iconURL({format: "png", dynamic: true}))
        msg.channel.send(embed).then(async c => {
          c.react("🎉");
          const filter = (reaction, user) => {
            return reaction.emoji.name === "🎉" && user.id !== client.user.id
          }
          const collector = await new ReactionCollector(c, filter, {max: 1});
          collector.on("collect", async(reaction, user) => {
            c.delete();
            collector.stop();
            await msg.channel.send(`${user.tag} won the drop.`).then(r => {
              msg.channel.send(`Please check dm ${user.toString()}`)
              user.send(`Hey ${user.tag}, Congratulations on winning the drop. Here's a link: ${reward}. \n Its a ${random} drop. :) 👀 👀`);
            });
          });
    });
      client.msgCount = 0;
    }
    msgCooldown.add(msg.channel.id);
      setTimeout(() => {
        msgCooldown.delete(msg.channel.id)
      }, 60000)
  }
}