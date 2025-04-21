const request = require("request")
const MessageEmbed = require("discord.js").MessageEmbed
const randomToken = require('rand-token')

class API {

    // Connect to API and generate a new clickable link to earn money from Shrinkearn
    async connectApi() {
        return await new Promise(async (resolve, reject) => {
            if (!this.apiURL) await reject(`API options are not initialized`)
            else {
                await request(this.apiURL, {json: true}, async (err, response) => {
                    if (response.body.status == "error") {
                        if (response.body.message[0] == "Alias already exists.") await reject(`API options are invalid: the alias ${this.configs.alias} is already used`)
                        else if (response.body.message[0] == "URL is invalid.") await reject(`API options are invalid: the URL ${this.configs.destlink} is invalid`)
                        else if (response.body.message[0] == "Invalid API token.") await reject(`API options are invalid: the API token ${this.configs.token} is invalid`)
                        else if (response.body.message[0] == "An error occured while connecting to the API") await reject(`API options are invalid: the alias ${this.configs.alias} is already used`)
                        else if (response.body.message[0] == "Maximum alias length is 30 characters.") await reject(`API options are invalid: the alias ${this.configs.alias} is too long. His max length is 30 chars.`)
                    }
                    else if (err) await reject(err)
                    else await resolve(response.body.shortenedUrl)
                })
            }
        })
    }

    // Trigger the link creation and return it as a RichEmbed                     Hey this is my api key:2d461b9b6320bbdd581f60d16702fde2714657dc
    async createGen (options) {
        return await new Promise(async (resolve, reject) => {
            this.configs = {
                token: options.tokenAPI,
                alias: randomToken.generate(30),
                destlink: options.redirectLink,
                baseURL: "https://shrinkearn.com/api?api={{TOKEN}}&url={{DESTLINK}}&alias={{ALIAS}}"
            }
            this.apiURL = this.configs.baseURL.replace("{{TOKEN}}", this.configs.token).replace("{{DESTLINK}}", this.configs.destlink).replace("{{ALIAS}}", this.configs.alias)

            await this.connectApi()
                .then(async (shortURL) => {
                    await resolve (shortURL)})
                .catch(async (err) => { await reject(err) })
        })
    }
}

module.exports = new API