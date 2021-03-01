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


// Used for display purposes
const channelName = "<Display name of the channel to sit in chat>";

module.exports = { opts, channelName }
```