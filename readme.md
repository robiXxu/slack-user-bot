# slack-user-bot
Transform your account in a bot.

### Up and running
Clone and run
```sh
npm install
```

If you get a error similar to this ( on Mac ):
```sh
/node-icu-charset-detector.cpp:7:10: fatal error: 'unicode/ucsdet.h' file not found
#include <unicode/ucsdet.h>
```
This should solve the issue
```sh
brew install icu4c
brew link icu4c --force
```
Rename config/slack.js.default to slack.js

Navigate to https://<teamname>.slack.com/account/gateways and find "Getting Started: IRC"

Fill up the slack.js file.

Run using:
```sh
node app.js
```

### Commands:
Currently have a small number of commands. My intention was to make something that i can use to "mess" with my colleagues and have a laugh. But you can go further and implement whatever you want...

If you make something cool and want to share pleaase make a pull request.

This could also be used to develop custom integrations for a free team with a limited number who already reached that limit.


### Problems
- doesn't work in DM's

### Todo
- fix DM
- add args to services & commands
- refactoring
