# LIRI
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


## Usage
Within bash, type `node liri.js` or `node liri.js <command>`

LIRI takes in 4 basic commands which performs 4 different tasks

* `my-tweets` Shows a user's Tweets.
* `spotify-this-song` Display's information of songs.
* `movie-this` Displays information of a Movie.
* `do-what-it-says` Picks a random command stored in a text file.

Basic error handling allows users to type the commands as `mytweets`, `MYTWEETS`, `my-TWEETS`, `my tweets`, `My Tweets`.

Other basic validations have been included to prevent invalid input. E.g: Typing an invalid command, typing a string instead of a number, etc...

**LIRI logs and saves user input in log.txt**

## Installation
LIRI can be downloaded by cloning this repository `https://github.com/roverkim/liri-bot.git`

After installation, open node and run `npm install` in the local file location.

To run LIRI, type `node liri.js`

## Files
Instead of grouping all the code in one file, LIRI has been split into multiple files.

1. `keys.js` Stores API keys.
2. `liri.js` Main execution point.
3. `functions.js` File that stores all the Functions.
4. `questions.js` File that stores all the questions used by inquirer.
5. 'random.txt' Stores random commands for LIRI to execute.
6. 'log.txt' Stores a log of user commands and results.
