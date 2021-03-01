const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");
const creds = require('./credentials.js')

// Path to command HTML file
const commandListIndexHTML = path.resolve(__dirname, 'commandslist/public/index.html');

// The heading and closing of the web page
const HTMLheading = `<html>
<head>
<title>${creds.channelName}'s Chat Commands</title>
<link rel="stylesheet" href="/css/index.css">
</head>
<body><main>\n`;
const HTMLclosing = `\n</main></body></html>`;

// The fixed commands
const ownerCommandList = {
    '!removecomm': 'Remove a command.'
}
const modCommandList = {
    '!addcomm': 'Add a command. Syntax is !addcomm "&lt;Command Name&gt;" "&lt;Response&gt;". Both the command name and command response must be between quotation marks.',
    '!editcomm': 'Edit an existing command. Syntax is !addcomm "&lt;Command Name&gt;" "&lt;Response&gt;". Both the command name and command response must be between quotation marks.',
    '!addquote': 'Adds the quote to the quote list. The quote is all text after !addquote.'
}
const fixedCommandList = {
    '!quote': 'Print a random quote to chat. If a number is given, prints a specific quote.'
}
const counterCommandList = {
    '!count / !counts / !counter': 'Print the current status of the active counter.',
    '!startcounter': 'Starts a counter with the given text. A label must also be provided. (Mod+ Only)',
    '!endcounter': 'Ends and removes the currently active counter (Mod+ Only)',
    '!cup': 'Increment the counter. (Mod+ Only)',
    '!cdown': 'Decrement the counter. (Mod+ Only)',
    '!cset': 'Set the current counter to a specific value. (Owner Only)'
}

// Write the page contents
function writeCommandPageHTML(commandList) {
    // Only include commands that begin with an !
    let userCommandList = {}
    for(com in commandList) {
        if(com[0] === '!')  {
            userCommandList[com] = commandList[com];
        }
    }

    let pageContents = HTMLheading;
    userCommandList = Object.assign({}, fixedCommandList, userCommandList);
    pageContents += buildHTMLBlock(userCommandList, 'Available Commands');
    pageContents += buildHTMLBlock(modCommandList, 'Moderator Commands');
    pageContents += buildHTMLBlock(counterCommandList, 'Counter Commands')
    pageContents += buildHTMLBlock(ownerCommandList, 'Channel Owner Commands');
    pageContents += HTMLclosing
    fs.writeFileSync(commandListIndexHTML, pageContents);
    deployFirebase();
}

// Build a block of commands
function buildHTMLBlock(clist, sectionHeader) {
    let block = `<ol class="minimizable-box">\n`;
    block += `\t<span class="box-header">${sectionHeader}</span>\n`;
    for(com in clist) {
        block += `\t<li class="command">\n`;
        block += `\t\t<div class="command-name">${com}</div>\n`
        block += `\t\t<div class="command-result">${clist[com]}</div>\n`
        block += `\t</li>\n`
    }
    block += `</ol><br>`
    return block;
}

// Deploy to firebase
function deployFirebase() {
    exec("cd commandslist; firebase deploy");
}

module.exports = { writeCommandPageHTML }