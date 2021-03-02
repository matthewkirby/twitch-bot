const usersToGreet = {
    'xopar': 0,
    'hellknight86': 0
};

function evalGreeting(client, channel, context) {
    // Check if I should greet a user
    const uname = context['username'];
    if(!(uname in usersToGreet)) { return; }

    // Has it been 90 mins (5.4e6 ms) since their last message?
    const millis = Date.now();
    if(millis - usersToGreet[uname] > 5.4e6) {
        if(usersToGreet[uname] === 0) {
            client.say(channel, `Hi ${context['display-name']} xoparEyes`);
        }
        else {
            client.say(channel, `Welcome back ${context['display-name']} xoparEyes`);
        }
    }

    // Set their most recent message time and return
    usersToGreet[uname] = millis;
    return;
}

module.exports = { evalGreeting }