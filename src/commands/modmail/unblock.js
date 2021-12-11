'use strict';

const Command = require("../../structure/Command.js");
const humanizeDuration = require('humanize-duration');

class UnBlock extends Command {
    constructor() {
        super({
            name: 'unblock',
            category: 'modmail',
            description: 'This command unblock a user from modmail !',
            usage: 'close',
            example: ['close']
        });
    }

    async run(client, message) {

        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                client.db.run('DELETE FROM blocked WHERE userID = ?', [rows.userID])
                let user = client.users.cache.get(rows.userID)
                return message.channel.send("**The user " + user.tag + " (" + user.id + ")" + " has been correctly unblocked**")


            } else {
                let target = message.mentions.users.first() || client.users.cache.get(args[1])
                client.db.run('DELETE FROM blocked WHERE userID = ?', [target.id])
                return message.channel.send("**The user " + target.username + " (" + target.id + ") has been correctly unblocked**")
            }
        })

    };
};
module.exports = new UnBlock;