'use strict';
const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = (client, message) => {

    if (message.author.bot) return;

    let guildmodmail = client.guilds.cache.get(client.guildmodmail);
    let guildmembermail = client.guilds.cache.get(client.guildmembermail);
    let category = client.channels.cache.find(c => c.id == client.modmailcategory && c.type == "category");

    if(message.channel.type === 'dm') {
    	        client.db.get('SELECT * FROM blocked WHERE userID = ?', [message.author.id], (err, rows) => {
                if(rows) return


        if (!guildmembermail.member(message.author.id)) return;
        client.db.get('SELECT * FROM modmail WHERE userID = ?', [message.author.id], (err, rows) => {

        if(message.content.startsWith("!")) return
            if(err) throw err;

if(!rows) {
    guildmodmail.channels.create(message.author.username + "-" + message.author.discriminator)
        .then(async channel => {
            channel.setParent(category.id);
            await channel.createWebhook(message.author.username, {
                avatar: message.author.displayAvatarURL({format: "png"}),
            }).then(async webhook => {

            client.db.run(`INSERT INTO modmail (userID, channelID, whid, whtoken) VALUES ('${message.author.id}', '${channel.id}', '${webhook.id}', '${webhook.token}')`)
                let guild = client.guilds.cache.get(client.guildmembermail)
                let member = guild.members.cache.get(message.author.id)
                const accountAge = humanizeDuration(Date.now() - message.author.createdAt, {largest: 2, round: true})
                const joinat =  humanizeDuration(Date.now() - member.joinedAt, {largest: 2, round: true})
await channel.send(`@here New modmail thread (${message.author.tag})\nACCOUNT AGE **${accountAge}**, ID: **${message.author.id}**\nNICKNAME **${member.nick || member.user.username}**, JOINED **${joinat}** ago\n────────────────`)
                const webhookClient = new Discord.WebhookClient(webhook.id, webhook.token);
                webhookClient.send('new modmail message', {
                    username: message.author.username,
                    avatarURL: message.author.displayAvatarURL({dynamic: true, format: "png"}),
                    content: message.content,
                });
        });
        });
    return message.author.send(client.wlcmsg)
}
        })
        client.db.get('SELECT * FROM modmail WHERE userID = ?', [message.author.id], (err, rows) => {
            if(!rows) return;
            const webhookClient = new Discord.WebhookClient(`${rows.whid}`, `${rows.whtoken}`);

            return webhookClient.send('new modmail message', {
                username: `${message.author.username}`,
                avatarURL: `${message.author.displayAvatarURL({dynamic: true, format: "png"})}`,
                content: `${message.content}`,
            });
        })
    })

}

    client.db.get('SELECT * FROM modmail WHERE channelID = ?', [message.channel.id], (err, rows) => {
if(rows) {
    if(message.content.startsWith("!")) return;
    message.delete()
    let user = client.users.cache.get(rows.userID)

    let highrole = message.member.roles.highest;
    message.channel.send("**("+ message.author.username+ ") " + highrole.name + "**: " + message.content)
    user.send("**" + highrole.name + "**: " + message.content)
}
    })

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);


    if (message.content.startsWith(client.prefix)) {


    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (command) {
    if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('You don\'t have required permission to use that command!')
        }
    }

    try {
        command.run(client, message, args)
    } catch (err) {
       client.emit('error',err);
            }
        }
    }
};
