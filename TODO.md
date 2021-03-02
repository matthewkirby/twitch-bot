1. Take any personalized things out (only thing left is in `greeting.js`) and store as a dict
2. For greetings, store the user's login name as well as how I want to greet them. i.e. hellknight86 vs Hellknight
3. Refactor things into submodules
4. Make a new dir of things for tools like `twitchAPIAccess.js`
6. Generalize command lookup using some form of db or object. The object would need props
    - Command to call it
    - Required privledge to call it
    - Points to call it
    - Description for the commandslist page
    - Function that is called when the command is requested. This could be a function like `addCommand()` or could be an inline thing that spits out a string.