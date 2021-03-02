const fs = require('fs');
const path = require('path');
const hostCommandList = require('../buildCommandList.js');

// Path to json file of commands
commandPath = path.resolve(__dirname, '../data/command_list.json');

// Load commands from the JSON file
function loadCommands() {
    let rawdata = fs.readFileSync(commandPath);
    commandList = JSON.parse(rawdata);
    console.log("Loaded commands.");
}

// Save edited commandList to file
function saveCommands() {
    fs.writeFileSync(commandPath, JSON.stringify(commandList, null, 4));
    hostCommandList.writeCommandPageHTML(commandList);
    console.log('Deployed firebase build');
}

// Add a new command to the list of commands
function addCommand(msg, isNew) {
    // Some simple error checking
    if(msg.split('"').length !== 5 && isNew) { return 'Incorrect format for adding a command. Please use !addcomm "command" "response"' };
    if(msg.split('"').length !== 5 && !isNew) { return 'Incorrect format for adding a command. Please use !editcomm "command" "response"' };
    let commandName = msg.split('"')[1];
    let botResponse = msg.split('"')[3];
    if(commandName.length === 0) { return "Command must not be blank" };
    if(botResponse.length === 0) { return "Reponse must not be blank" };
    if(commandName in commandList && isNew) { return `A command named ${commandName} already exists! Please try !editcomm instead.`; }
    if(!(commandName in commandList) && !isNew) { return `The command that you are trying to edit (${commandName}) does not exist. Please try !addcomm instead.`; }

    // Add the command
    commandList[commandName] = botResponse;
    saveCommands();
    if(isNew) { return `Successfully added new command: ${commandName}`; }
    else { return `Successfully edited command: ${commandName}`; }
}

// Delete a command
function delCommand(msg) {
    // Some simple error checking
    if(msg.split('"').length !== 3) { return 'Incorrect format for removing a command. Please use !removecomm "command"' };
    let commandName = msg.split('"')[1];
    if(commandName.length === 0) { return "Command must not be blank" };
    if(!(commandName in commandList)) { return `Command ${commandName} not found.` };

    // Delete the command
    delete commandList[commandName];
    saveCommands();
    return `Command ${commandName} has been removed.`
}

// When a message comes in that doesn't match to anything else, check if it is a simple text response
function easyCommands(client, channel, commandName) {
    if(!(commandName in commandList)) { return `* Unknown command ${commandName}`; }
    client.say(channel, commandList[commandName]);
    return true;
}

module.exports = { loadCommands, addCommand, delCommand, easyCommands, saveCommands }