const fetch = require('node-fetch');
const tmi = require('tmi.js');
const creds = require('../credentials.js');

// To refresh a token, see the code here: https://dev.twitch.tv/docs/authentication#refreshing-access-tokens

// Make a POST request for an auth token
// fetch(`https://id.twitch.tv/oauth2/token?client_id=${creds.twitchClientID}&client_secret=${creds.twitchClientSecret}&grant_type=client_credentials`, {
//     method: 'POST'
// })
// .then(res => res.json())
// .then(res => {
//     console.log(res);
// });

async function shoutoutCommand(client, channel, inputmsg) {
    // Set up some config
    const opts = { method: 'GET', headers: {'Client-ID': creds.twitchClientID, 'Authorization': 'Bearer ' + creds.twitchAPIToken} };

    // Parse channel name
    const channelName = inputmsg.split(' ').slice(1).join(' ');

    // Make REST calls
    const userresp = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, opts).then(res => res.json());
    const channelresp = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${userresp.data[0].id}`, opts).then(res => res.json());
    const channeldata = channelresp.data[0];
    const msg = `Go check out ${channeldata.broadcaster_name}'s stream over at twitch.tv/${channeldata.broadcaster_login} ! They were last playing ${channeldata.game_name} ~ Be sure to go drop them a follow!`;

    // Post in chat
    client.say(channel, msg);
}

module.exports = { shoutoutCommand }