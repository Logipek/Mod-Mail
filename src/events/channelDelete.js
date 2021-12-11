'use strict';

module.exports = async (client, channel) => {
    client.db.get('SELECT * FROM modmail WHERE channelID = ?', [channel.id], async (err, rows) => {
        if(rows) {
            client.db.run('DELETE FROM modmail WHERE channelID = ?', [channel.id])
        } else return
    });

};

