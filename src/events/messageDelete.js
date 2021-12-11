'use strict';

module.exports = async (client, messageDelete) => {
    if(messageDelete.channel.type === "dm") {
        client.db.get('SELECT * FROM modmail WHERE userID = ?', [messageDelete.author.id], async (err, rows) => {
            if (rows) {
                let channel = client.channels.cache.get(rows.channelID)

                channel.send("**The user delete this message:** \`\`" + messageDelete.content + "\`\`")

            } else return
        });
    }
};

