'use strict'; // Defines that JavaScript code should be executed in 'strict mode'.

const { token, dbname, guildmodmail, guildmembermail, modmailcategory, wlcmsg } = require('../config.json'),
 { Client, Collection } = require('discord.js'),
  { readdirSync } = require('fs'),
    { join } = require("path"),
    {green,red, blue} = require('colors');
const { Database } = require('sqlite3').verbose();
class Class extends Client {
    constructor(token) {
        super({messageCacheMaxSize: 15});
        this.bot = this;
        this.guildmodmail = guildmodmail
        this.guildmembermail = guildmembermail
        this.modmailcategory = modmailcategory
        this.prefix = '!';
        this.wlcmsg = wlcmsg
        try {
            this.launch().then(() => { console.log(blue('All is launched, Connecting to Discord..')); })
        } catch (e) {
            throw new Error(e)
        }
        this.login(token);
        this.db = new Database("./db/" + dbname + ".db", (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to local database ' + blue(dbname));
        });
        this.db = new Database("./db/" + "blocked" + ".db", (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to local database ' + blue("blockeduser"));
        });
    }

    async launch() {
        console.log(blue("Starting the bot"));
        this.commands = new Collection();
        this._commandsHandler();
        this._eventsHandler();
    }

    _commandsHandler() {
        let count = 0;
        const folders = readdirSync(join(__dirname, "commands"));
        for (let i = 0; i < folders.length; i++) {
            const commands = readdirSync(join(__dirname, "commands", folders[i]));
            count = count + commands.length;
            for(const c of commands){
                try {
                    const command = require(join(__dirname, "commands", folders[i], c));
                    this.commands.set(command.name, command);
                } catch (error) {
                    console.log(`${red('[Commands]')} Failed to load command ${c}: ${error.stack || error}`)
                }
            }
        }
        console.log(`${green('[Commands]')} Loaded ${this.commands.size}/${count} commands`)
    }

    _eventsHandler() {
        let count = 0;
        const files = readdirSync(join(__dirname, "events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "events", e));
                this.on(fileName, file.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, "events", e))];
            } catch (error) {
                throw new Error(`${red('[Events]')} Failed to load event ${e}: ${error.stack || error}`)
            }
        });
        console.log(`${green('[Events]')} Loaded ${count}/${files.length} events`)
    }

}

module.exports = new Class(token);

