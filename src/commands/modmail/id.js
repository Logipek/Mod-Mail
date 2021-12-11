'use strict';

const Command = require("../../structure/Command.js");


class Id extends Command {
    constructor() {
        super({
            name: 'id',
            category: 'modmail',
            description: 'This command show the id of the user !',
            usage: 'id',
            example: ['id']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
message.channel.send(rows.userID)
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Id;