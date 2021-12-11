'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            category: 'utils',
            description: 'This commands give the bot latance !',
            usage: 'ping',
            example: ['ping'],
            aliases: ['latance']
        });
    }
    async run(client, message) {
        message.channel.send(`Pong :ping_pong: \`${Math.sqrt(((new Date() - message.createdTimestamp)/(5*2))**2)} ms\``)
    }
}

module.exports = new Ping;