'use strict';

const Command = require("../../structure/Command.js");


class Status extends Command {
    constructor() {
        super({
            name: 'status',
            category: 'modmail',
            description: 'This command show the status of the user !',
            usage: 'status',
            example: ['status']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                let user = client.users.cache.get(rows.userID)
                let status = user.presence.status
                if(status === "dnd") status = "**Do not disturb**"
                if(status === "online") status = "**Online**"
                if(status === "offline") status = "**Offline**"
                if(status === "idle") status = "**Idle**"
                message.channel.send("User status: " + status)
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Status;