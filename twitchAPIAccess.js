const fetch = require('node-fetch');
const creds = require('./credentials.js');

let key = "";
let expiresOn = Date.now();

async function getAccessToken() {
    if(expiresOn < Date.now() + 30000) {
        const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${creds.twitchClientID}&client_secret=${creds.twitchClientSecret}&grant_type=client_credentials`, { method: 'POST' }).then(res => res.json());
        key = response.access_token;
        expiresOn = Date.now() + response.expires_in*1000;
        console.log("Obtained a new API Access Token")
    }

    return key;
}

module.exports = { getAccessToken };