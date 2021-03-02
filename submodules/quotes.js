const fs = require('fs');
const path = require('path');

// Path to json file of quotes
dataPath = path.resolve(__dirname, '../data/quote_list.json');

// Load quotes from the JSON file
function loadQuotes() {
    let rawdata = fs.readFileSync(dataPath);
    quoteList = JSON.parse(rawdata);
    console.log("Loaded quotes.");
}

// Save edited quoteList to file
function saveQuotes() {
    fs.writeFileSync(dataPath, JSON.stringify(quoteList, null, 4));
}

// Add a new quote to the list of quotes
function addQuote(msg) {
    // Some simple error checking
    if(msg.split(' ').length < 2) { return '' };
    let quote = msg.split(' ').slice(1).join(' ');

    // Find the quote number
    let keys = [];
    Object.keys(quoteList).forEach(key => { keys.push(parseInt(key,10)); });
    let newKey = (Math.max(...keys) + 1).toString();

    // Add the quote
    quoteList[newKey] = quote;
    saveQuotes();
    return `Successfully added Quote #${newKey}`;
}

// Return a quote
function printQuote(msg) {
    // If no number is provided, give a random quote
    if(msg.split(' ').length < 2) {
        keyList = Object.keys(quoteList);
        const random = Math.floor(Math.random() * keyList.length)
        return quoteList[keyList[random]];
    }
    else if(msg.split(' ')[1] in quoteList) {
        return quoteList[msg.split(' ')[1]];
    }
    else {
        return '';
    }
}

module.exports = { loadQuotes, addQuote, printQuote }