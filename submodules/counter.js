const fs = require('fs');
const path = require('path');

const counterPath = path.resolve(__dirname, '../generated_content/counter.txt');

function initCounter(msg) {
    // Ensure that a message is given and a counter doesn't already exist
    if(msg.split(' ').length < 2) { return 'Please include counter text.' };
    if(fs.readFileSync(counterPath, 'utf8') !== '') { return 'Only one counter can be active at once.' };

    let counterText = msg.split(' ').slice(1).join(' ');
    fs.writeFileSync(counterPath, counterText + ': 0', encoding='utf8');
    return counterText + ': 0';
}

function delCounter() {
    if(fs.readFileSync(counterPath, 'utf8') === '') { return 'No currently active counter.' };
    let status = fs.readFileSync(counterPath, 'utf8');
    fs.writeFileSync(counterPath, '', encoding='utf8');
    return 'Counter Removed. Final status was ' + status;
}

function loadCounter() {
    // Current status of counter
    let counterDisplay = fs.readFileSync(counterPath, 'utf8');
    let text = counterDisplay.split(':').slice(0, -1).join(':');
    let [number] = counterDisplay.split(' ').slice(-1);
    return [text, parseInt(number, 10)];
}

function counterUpdate(adjustment=0, newValue=null) {
    // Check that a counter exists and load the current status
    if(fs.readFileSync(counterPath, 'utf8') === '') { return 'No currently active counter.' };
    let [text, number] = loadCounter();

    // Update the value
    if(newValue !== null) {
        number = newValue;
    } else {
        number += adjustment;
    }

    // Return and save the current status
    let counterDisplay = text + ': ' + number;
    fs.writeFileSync(counterPath, counterDisplay);
    return counterDisplay;
}

// Increment the counter
function counterIncrement() {
    return counterUpdate(adjustment=1);
}

// Decrement the counter
function counterDecrement() {
    return counterUpdate(adjustment=-1);
}

// Set the counter to a fixed value
function counterSet(msg) {
    let [newValue] = msg.split(' ').slice(-1);
    return counterUpdate(adjustment=0, value=parseInt(newValue, 10));
}

// Return the current status of the counter
function counterStatus() {
    // Check that a counter exists
    let counterDisplay = fs.readFileSync(counterPath, 'utf8');
    if(counterDisplay === '') { return 'No currently active counter.' };
    return counterDisplay;
}

module.exports = { initCounter, delCounter, counterIncrement, counterDecrement, counterSet, counterStatus }