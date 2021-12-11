'use strict';
module.exports = async (client, channel, user) => {
    if(user.bot) return
    if(channel.type === "dm") {
        client.db.get('SELECT * FROM modmail WHERE userID = ?', [user.id], async (err, rows) => {
            if(rows) {
                let channel = client.channels.cache.get(rows.channelID)
                    channel.startTyping().then(channel.stopTyping(), {timeout: 15000})
            }
        });
    } else {
        client.db.get('SELECT * FROM modmail WHERE channelID = ?', [channel.id], async (err, rows) => {

            if (rows) {
                client.users.cache.get(rows.userID).createDM().then(channel => {
                    channel.startTyping().then(channel.stopTyping(), {timeout: 15000})
                })
            }
        });
    }
};
