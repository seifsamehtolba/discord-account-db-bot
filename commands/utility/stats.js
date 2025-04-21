const Discord = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require("os");
let cpuStat = require("cpu-stat");
const ms = require("ms");
module.exports = {
  name: "stats",
  category: "utility",
  description: "Check Bot's status!",
  usage: "stats",
  run: async (client, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(client.uptime)
        .format(" D [days], H [hrs], m [mins], s [secs]");
      const embedStats = new Discord.MessageEmbed()
        .setColor(`#696969`)
        .setThumbnail(client.user.displayAvatarURL)
        .setAuthor("Glitch Status:", client.user.displayAvatarURL)
        .addField("Developer ", `Seif#0006 and MrSon#0255`, false)
        .addField(
          "Memory Usage",
          `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``,
          true
        )
        .addField("CPU Usage", `\`${percent.toFixed(2)} %\``, true);

      message.channel.send(embedStats);
    });
  }
};
