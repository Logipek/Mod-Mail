'use strict';

module.exports = async (client, oldMsg, newMsg) => {
    if(oldMsg.channel.type === "dm") {
        client.db.get('SELECT * FROM modmail WHERE userID = ?', [oldMsg.author.id], async (err, rows) => {
            if (rows) {
                let channel = client.channels.cache.get(rows.channelID)

                channel.send("**The user edit a message:**\nOld Message: \`\`" + oldMsg.content + "\`\`\nNew Message: \`\`" + newMsg.content + "\`\`")

            } else return
        });
    }
};

