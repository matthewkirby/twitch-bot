const fetch = require('node-fetch');
const creds = require('../credentials.js');
const {getAccessToken} = require('../twitchAPIAccess.js');


async function shoutoutCommand(client, channel, inputmsg) {
    // Set up some config
    const twitchAPIToken = await getAccessToken();
    const opts = { method: 'GET', headers: {'Client-ID': creds.twitchClientID, 'Authorization': 'Bearer ' + twitchAPIToken} };

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