'use strict';

const Command = require("../../structure/Command.js");
const humanizeDuration = require('humanize-duration');

class Block extends Command {
    constructor() {
        super({
            name: 'block',
            category: 'modmail',
            description: 'This command is to block a user for modmail !',
            usage: 'block',
            example: ['block']
        });
    }

    async run(client, message) {

        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                                        client.db.run(`INSERT INTO blocked (userID, modID) VALUES ('${rows.userID}', '${message.author.id}')`)
                let user = client.users.cache.get(rows.userID)
return message.channel.send("**The user " + user.tag + " (" + user.id + ")" + " has been correctly blocked**")


            } else {
                        let target = message.mentions.users.first() || client.users.cache.get(args[1])
                                                                client.db.run(`INSERT INTO blocked (userID, modID) VALUES ('${target.id}', '${message.author.id}')`)
return message.channel.send("**The user " + target.username + " (" + target.id + ") has been correctly blocked**")
            }
        })

    };
};
module.exports = new Block;