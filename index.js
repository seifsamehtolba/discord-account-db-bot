const Discord = require("discord.js");
const Client = require("./Classes/Client");
const client = new Client();
const fs = require("fs");
const {readdirSync} = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
const initC = (client) => {
    readdirSync("./src/commands/").forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => { 
                client.aliases.set(alias, pull.name)  
                if(pull.category !== "botowner") client.aliashelp.push(alias)
              });
            }
    });

    console.log(table.toString());
}
require("dotenv");
const mongoose = require("mongoose");
const config = client.config;

mongoose.connect(`mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
  console.log(`Connected to the database!`);
}).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

/*client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("DND"); 
  client.user.setActivity(`Getting Developed. Do not Disturb!`)
}); */ 

initC(client);

fs.readdir('./src/events/', (err, files) => {
    if (err) console.log(err)
    const jsfiles = files.filter(x => x.split('.').pop() === "js");
    console.log(`[EVENTS] Loaded ${jsfiles.length} events.`)
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client)); 
    });
    //client.on("ready", require(`./events/autoReady.js`).bind(null, client))
  }); 


client.login("NzE5NTUwMjQxNDcyMjQ5OTU2.Xt_0Jw.jGrx8ai3xxJKYXYrIakAiq2nEcQ");