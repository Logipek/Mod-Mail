'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')

class Creation extends Command {
    constructor() {
        super({
            name: 'createAT',
            category: 'modmail',
            description: 'This command show the time of the user on discord !',
            usage: 'createAT',
            example: ['createAT']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                let user = client.users.cache.get(rows.userID)
                message.channel.send(`**This account has been created at:** ${moment.utc(user.createdAt).format('dddd Do MMMM YYYY, HH:mm:ss')}`)
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Creation;