'use strict';

const Command = require("../../structure/Command.js");
const humanizeDuration = require('humanize-duration');

class Newthread extends Command {
    constructor() {
        super({
            name: 'newmodmail',
            category: 'modmail',
            description: 'This command open a new thread !',
            usage: 'newmodmail <id>',
            example: ['newmodmail 527453735735753254']
        });
    }

    async run(client, message) {
        let guildmodmail = client.guilds.cache.get(client.guildmodmail);
        let category = client.channels.cache.find(c => c.id == client.modmailcategory && c.type == "category");
        let guild = client.guilds.cache.get(client.guildmembermail)
        let target = message.mentions.users.first() || guild.users.cache.get(args[1])

        client.db.get('SELECT * FROM modmail WHERE userID = ?', [target.id], async (err, rows) => {
            if(rows) {
return message.channel.send("**This user already has a modmail**")
            } else {
                guildmodmail.channels.create(target.username + "-" + target.discriminator)
                    .then(async channel => {
                        channel.setParent(category.id);
                        await channel.createWebhook(target.username, {
                            avatar: target.displayAvatarURL({format: "png"}),
                        }).then(async webhook => {

                            client.db.run(`INSERT INTO modmail (userID, channelID, whid, whtoken) VALUES ('${target.id}', '${channel.id}', '${webhook.id}', '${webhook.token}')`)
                            let member = guild.members.cache.get(target.id)
                            const accountAge = humanizeDuration(Date.now() - target.createdAt, {largest: 2, round: true})
                            const joinat =  humanizeDuration(Date.now() - member.joinedAt, {largest: 2, round: true})
                            await channel.send(`${message.author} Open a new modmail thread (${target.tag})\nACCOUNT AGE **${accountAge}**, ID: **${target.id}**\nNICKNAME **${member.nick || member.user.username}**, JOINED **${joinat}** ago\n────────────────`)
                        });
                    });
                return target.send("A modmail has been forced open ! You can speak now with the mod team.")
            }
        })

    };
};
module.exports = new Newthread;