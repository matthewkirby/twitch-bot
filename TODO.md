# Bugs or Small Improvements
- Take any personalized things out (only thing left is in `greeting.js`) and store as a dict
- For greetings, store the user's login name as well as how I want to greet them. i.e. hellknight86 vs Hellknight
- Make a new dir of things for tools like `twitchAPIAccess.js`
- Is there a way to just import things more elegently?
- Handle paths to generated data from root dir

# Refactor
- Generalize command lookup using some form of db or object. The object would need props
    - Command to call it
    - Required privledge to call it
    - Points to call it
    - Description for the commandslist page
    - Function that is called when the command is requested. This could be a function like `addCommand()` or could be an inline thing that spits out a string.

# New Features
- A points system
    - Checks users in chat every time t and assigns points
- !bet system
    - `!startbet`
    - Guesses are made via `!bet <guess>`
    - "No currently active bets"
    - `!endbet <correct answer>` and guessing correctly award points
- Streamlabels
    - Recent follower, recent subscriber
    - This needs to be done via EventHandler and I don't know how to do this. 
    - This would be a first step towards full alert support