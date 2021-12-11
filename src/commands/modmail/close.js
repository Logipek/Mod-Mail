'use strict';

const Command = require("../../structure/Command.js");


class Close extends Command {
    constructor() {
        super({
            name: 'close',
            category: 'modmail',
            description: 'This command close a modmail !',
            usage: 'close',
            example: ['close']
        });
    }

    async run(client, message) {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], async (err, rows) => {
            if(rows) {
                client.db.run('DELETE FROM modmail WHERE channelID = ?', [message.channel.id])
                await message.channel.send("Closing ticket").then(message.channel.delete("closing ticket by " + message.author.username), {timeout: 1000})
                try {
                    await client.users.cache.get(rows.userID).send("Your modmail has been correctly closed ! Have a good day (:")
                } catch{}
            } else return message.channel.send('This is not a ticket channel')
        })

    };
};
module.exports = new Close;