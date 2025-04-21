const minecraft = require("./../mongodb/minecraft");
const hulu = require("./../mongodb/hulu");
const nordvpn = require("./../mongodb/nordvpn");
const crunchyroll = require("./../mongodb/crunchyroll");
const spotify = require("./../mongodb/spotify");
const steam = require("./../mongodb/steam");
const drop = require("./../functions/drops");
module.exports = async function(client, msg) {
  const prefix = client.config.prefix
  if (msg.author.bot || msg.channel.type !== "text") return;  
  
  await drop(client, msg);
  if(!msg.content.startsWith(prefix)) return;
  
  const args = msg.content.slice(client.config.prefix.length).split(" "); // ok so now I try see if it does anything when I enter a command
  // message.content: the content of the message 
  // .slice(): chops off the beginning of the message
  // this.prefix.length: the number of characters the prefix is
  // .split(" "): make an array of arguments (arg[0] would be the command)
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) {
    if(command.category == "botowner") {
      if(!client.config.owners.includes(msg.author.id)) return client.embed(msg.channel, {
        name: ` | You are not the developer of this bot`,
        av: msg.author.avatarURL({format: "png", dynamic: true})
      })
    }
    command.run(client, msg, args, prefix);
  }
  
}
