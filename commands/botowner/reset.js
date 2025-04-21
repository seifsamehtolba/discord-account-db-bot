const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "reset",
    aliases: ["restart", "r"],
    category: "botowner",
    description: "Clears the chat",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
  .setTitle("Resetting!")
  .setDescription("We restarted the bot successfully.")
  
  await message.channel.send(embed)
process.exit(1);
}
    }
