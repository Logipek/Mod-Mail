'use strict';
const {blue} = require('colors');
module.exports = async (client) => {
    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);
    await client.db.run(`CREATE TABLE IF NOT EXISTS modmail(userID VARCHAR(30), channelID VARCHAR(30), whid VARCHAR(30), whtoken LONGTEXT(3000))`);
    await client.db.run(`CREATE TABLE IF NOT EXISTS blocked(userID VARCHAR(30), modID VARCHAR(30))`);
};
