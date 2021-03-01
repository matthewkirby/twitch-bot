const tmi = require('tmi.js');
const creds = require('./credentials.js');
const ez = require("./ezcomms.js");
const quotes = require("./quotes.js");
const greeting = require("./greeting.js");
const counter = require("./submodules/counter.js");
const so = require("./submodules/shoutout.js");

// Create a client with our options
const client = new tmi.client(creds.opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    ez.loadCommands();
    quotes.loadQuotes();
    console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler(channel, context, msg, self) {
     // Ignore messages from the bot
    if (self) { return; }

    // Repond with a greeting if appropriate
    greeting.evalGreeting(client, channel, context)

    // Set some constants
    const commandName = msg.trim();
    const isowner = context['user-id'] === '21586333';
    const ismod = context['mod'] === true || isowner;

    // ==================================
    // CHANNEL OWNER ONLY
    // ==================================
    if(isowner) {
        if(commandName.startsWith('!removecomm')) {
            let status = ez.delCommand(commandName);
            client.say(channel, status);
        }
        else if(commandName.startsWith('!cset')) {
            let status = counter.counterSet(commandName);
            client.say(channel, status)
        }
    }

    // ==================================
    // MODERATOR ONLY 
    // ==================================
    if(ismod) {
        if(commandName.startsWith('!addcomm')) {
            let status = ez.addCommand(commandName, true);
            client.say(channel, status);
        }
        else if(commandName.startsWith('!editcomm')) {
            let status = ez.addCommand(commandName, false);
            client.say(channel, status);
        }
        else if(commandName.startsWith('!addquote')) {
            let status = quotes.addQuote(commandName);
            client.say(channel, status);
        }
        else if(commandName.startsWith('!startcounter')) {
            let status = counter.initCounter(commandName);
            client.say(channel, status);
        }
        else if(commandName === '!endcounter') {
            let status = counter.delCounter(commandName);
            client.say(channel, status);
        }
        else if(commandName === '!cup') {
            let status = counter.counterIncrement();
            client.say(channel, status);
        }
        else if(commandName === '!cdown') {
            let status = counter.counterDecrement();
            client.say(channel, status);
        }
        else if(commandName.startsWith('!so ')) {
            so.shoutoutCommand(client, channel, commandName);
        }
    }

    // ==================================
    // EVERYONE
    // ==================================
    if(commandName.startsWith('!quote')) {
        let res = quotes.printQuote(commandName);
        client.say(channel, res);
    }
    else if(commandName.startsWith('!count')) {
        let status = counter.counterStatus();
        client.say(channel, status);
    }
    else if(commandName.startsWith('!reloadcommands')) {
        ez.saveCommands();
        client.say(channel, 'Reloaded the commands list. Deploying changes now.');
    }
    else {
        let found = ez.easyCommands(client, channel, commandName);
        if (!found) { console.log(`* Unknown command ${commandName}`); }
    }
}

