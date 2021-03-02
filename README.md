Requires a file called `credentials.js`. You must use the following template for this file. Please fill in anything in between `<>`.

```js
// Define configuration options
const opts = {
    identity: {
        username: "<Bot Account Name>",
        password: "<Bot Account OAuth Token>"
    },
    channels: ["<Name of the channel to sit in chat>"]
};

// Client ID for making API requests
const twitchClientID = "Twitch Client ID";
const twitchClientSecret = "Twitch Client ID Secret";

// Channel who's chat is being used, for display purposes
const channelName = "<Display name of the channel to sit in chat>";

module.exports = { opts, twitchClientID, twitchClientSecret, channelName }
```