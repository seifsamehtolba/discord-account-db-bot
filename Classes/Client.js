const {Client, MessageEmbed} = require("discord.js");
const Enmap = require("enmap")
module.exports = class Bot extends Client {
  constructor() {
    super({
      fetchAllMembers: true
    });
    this.config = require("./../config");
    this.Discord = require("discord.js");
    this.commands = new Enmap();
    this.aliases = new Enmap();
    this.aliashelp = [];
    this.msgCount = 0;
  }
  
   /**
     * 
     * @param {object} msg 
     * @param {object} author 
     * @param {string} title 
     * @param {string} description 
     * @param {array} fields 
     * @param {object} footer 
     * @param {string} thumbnail 
     * @param {string} image 
     * @param {array} files 
     * @param {string} url 
     */
    async embed(channel, author, title, description, color, fields, footer, thumbnail, image, files, url) {
        let embed = new MessageEmbed()

        if(author) {
            if(typeof author !== "object") throw new Error(`Title must be a object.`);
            embed.setAuthor(author.name, author.av)
        }

        if(title) {
            if(typeof title !== "string") throw new Error(`title must be a string.`);
            embed.setTitle(title);
        }

        if(description) {
            if(typeof description !== "string") throw new Error(`Description must be a string.`)
            embed.setDescription(description);
        }
        embed.setColor(color ? color : "RANDOM")
      

        if(fields) {
            if(Array.isArray(fields)) {
            fields.forEach(r => {
                embed.addField(r.name, r.value, r.inline);
            });
        }

        }
        if(footer) {
            if(typeof footer !== "object") throw new Error(`Footer must be a object`)
            embed.setFooter(footer.name, footer.av)
            .setTimestamp();
        }
        if(thumbnail) {
            if(typeof thumbnail !== "string") throw new Error(`Thumbnail is not a string.`);
            embed.setThumbnail(thumbnail);
        }
        if(image) {
            if(typeof image !== "string") throw new Error(`Image must be a string url.`);
            embed.setImage(image);

        }

        if(files) {
            if(Array.isArray(files)) {
                embed.attachFiles(files);
            }
        }

        return channel.send(embed);
    }
  
}