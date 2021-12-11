'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')

class Avatar extends Command {
    constructor() {
        super({
            name: 'avatar',
            category: 'modmail',
            description: 'This command send the user avatar !',
            usage: 'avatar',
            example: ['avatar']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                let user = client.users.cache.get(rows.userID)
                message.channel.send(`**Avatar of the user:** ${user.displayAvatarURL({dynamic: true, format: "png"})}`)
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Avatar;