const fs = require('fs');
const path = require('path');

// Path to json file of quotes
const timerPath = path.resolve(__dirname, '../generated_content/timerDisplay.txt');

// Format seconds to 2 digits
function padNumber(n, size) {
    n = String(n);
    while(n.length < size) { n = '0' + n };
    return n;
}

function startTimer(client, channel, msg) {
    // Some error checking
    if(msg.split(' ').length < 2) {
        client.say(channel, `No timer duration specified.`);
        return;
    }

    // Set up for the timer
    let duration = parseInt(msg.split(' ').slice(1).join(' '), 10);
    let endTime = Date.now() + duration * 60000;

    // Run the timer and output every 1 second
    let x = setInterval(function() {
        let distance = endTime - Date.now();
        // Exit when the timer ends
        if(distance < 0) {
            clearInterval(x);
            client.say(channel, `${duration} minute timer done!`);
        }
        else {
            let minutes = Math.floor(distance / (1000 * 60));
            let seconds = Math.floor(distance % (1000 * 60) / 1000);
            fs.writeFileSync(timerPath, `${minutes}:${padNumber(seconds, 2)}`);
        }
    }, 1000);

    return;
}

module.exports = { startTimer }