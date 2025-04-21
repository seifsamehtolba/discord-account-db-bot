const api = require("./../../api/shrinkearn.js");
const isUrl = require("isurl");
module.exports = {
    name: 'meme',
    description: 'sends meme',
    run: async(client, message, args, prefix) => {
    if(!client.config.owners.some(r => message.author.id === r)) return message.channel.send(`You are not the dev.`)
    if(!args[0]) return message.channel.send(`Specify a url please.`);
    
    
    
    let res = await api.createGen({tokenAPI: client.config.shrink, redirectLink: args[0]});
    
    message.channel.send(res);
    
    
  }
}