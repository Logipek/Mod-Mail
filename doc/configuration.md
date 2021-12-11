# 📝 Configuration
Haven't set up the bot yet? Check out [Setting up the bot](setup.md) first!

## Table of contents
- [Configuration file](#configuration-file) (start here)
- [Required options](#required-options)

## Configuration file
All bot options are saved in a configuration file in the bot's folder.
This is created during the [setup](setup.md) and is generally either `config.ini` or, if you've been using the bot for
longer, `config.json`.

The instructions on this page are for `config.ini` but can be adapted to `config.json` as well.
See [config.ini vs config.json](#configini-vs-configjson) for more details.
Note that the format of `.ini` and `.json` are different -- you can't simply rename a `.json` to `.ini` or
vice versa.

## Required options

#### token
The bot user's token from [Discord Developer Portal](https://discordapp.com/developers/).

#### guildmembermail
Your server's ID, wrapped in quotes.

#### guildmodmail
For a two-server setup, the inbox server's ID.  
For a single-server setup, same as [mainGuildId](#mainguildid).

#### modmailcategory
The category were appared the new threads.

#### wlcmsg
This message will send fb the user when he contact the bot in dm.

### Formatting
*See [the example on the Wikipedia page for JSON](https://en.wikipedia.org/wiki/JSON#Example)
for a general overview of the JSON format.*

* In `config.json`, all text values and IDs need to be wrapped in quotes, e.g. `"guildmembermail": "729715104261865586"`

