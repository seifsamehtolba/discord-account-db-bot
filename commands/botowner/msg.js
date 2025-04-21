module.exports = {
  name: 'msg',
  category: "botowner",
  description: "check msg or add msg",
  usage: "msg",
  run: async(client, message, args, prefix) => {
    if(!args[0]) return message.channel.send(`Invalid format. Format: ${prefix}msg check or ${prefix}msg add <number>`);
    
    if(args[0] == "check") {
      message.channel.send(`Messages sent: \`${client.msgCount}\``);
    }else if(args[0] == "add") {
      if(!args[1]) return message.channel.send(`Please specify amount of number to add.`);
      client.msgCount = client.msgCount + parseInt(args[1]);
      return message.channel.send(`Added ${args[1]} messages.`);
    }else{
      return message.channel.send(`Invalid format. Format: ${prefix}msg check or ${prefix}msg add <number>`);
    }
    
  }
}