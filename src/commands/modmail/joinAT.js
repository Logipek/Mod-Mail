'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')

class Creation extends Command {
    constructor() {
        super({
            name: 'joinAT',
            category: 'modmail',
            description: 'This command show how time ago the user is in the discord server !',
            usage: 'joineAT',
            example: ['joinAT']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                let guild = client.guilds.cache.get(client.guildmembermail)
                let member = guild.members.cache.get(rows.userID)
                message.channel.send(`**This account join the server at:** ${moment.utc(member.joinedAt).format('dddd Do MMMM YYYY, HH:mm:ss')}`)
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Creation;