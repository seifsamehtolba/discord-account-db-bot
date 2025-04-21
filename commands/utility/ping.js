const Discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "utility",
  description: "Check Bot's ping!",
  usage: "ping",
  run: async (client, message, args) => {

    const m = await client.embed(message.channel, {
      name: ` | If you can see this the bot is slow or the discord api is slow`,
      av: message.author.avatarURL({format: "png", dynamic: true})
    })
    let embed = new Discord.MessageEmbed()
    .setTitle("Pong!")
    .setAuthor(" | " + message.author.tag, message.author.avatarURL({format: "png", dynamic: true}))
    .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    .setFooter(client.config.footer, client.user.avatarURL({format: "png", dynamic: true}))
    .setThumbnail(message.guild.iconURL({format: "png", dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
m.edit(embed);

    
 
}
}