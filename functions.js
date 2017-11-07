/////////////////////////////////  /* External Packages */ /////////////////////////////////////////////////////

// Require External Packages
const twitterObject = require('twitter');
const spotifyObject = require('node-spotify-api');
const requestObject = require('request');
const inquirer = require("inquirer");
const fs = require("fs");

/////////////////////////////// /* Internal Packages & Keys */ /////////////////////////////////////////////////

// Require internal Keys & questions
const keys = require('./keys.js')
const questionObject = require('./questions.js')

// Create a new Object to store each indivual sets of keys
const client = new twitterObject(keys.twitterKeys);
const spotify = new spotifyObject(keys.spotifyKeys);

///////////////////////////////////// /* Liri Functions */ //////////////////////////////////////////////////

//////////////////////////////// Function for displaying tweets ///////////////////////////////////////////
function getTweets(){
  // Prompt the user with twitter questions
  inquirer.prompt(questionObject.twitterQuestions).then(function(answers){
    // Retrieve user input and store them in the params vairable
    var params = {screen_name: answers.twitterName, count: answers.limit}; // , count: 20
    // Pass params into the query to get tweets
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // Use the map funtion to extract all the tweets
        let currentTweets = tweets.map(eachIteration => eachIteration.text);
        let tweetCount = 0;

        let jsonTweet = JSON.stringify(currentTweets); // Converts Back to JSON String
        logtxt(answers.twitterName, answers.limit); // Log the Response
        logtxt(jsonTweet); // Log the Tweets


        // Display the tweets by looping through each tweet
        currentTweets.forEach(tweet => {tweetCount++; console.log(`
          ---------------------------------------------------------
          Tweet ${tweetCount}
          ---------------------------------------------------------

          ${tweet}

          `);
        }); // End of foreach
        reset();
      } else {
        return console.log(`Error: ${error}`);
        reset();
      };
    }); // End of Twitter Call
  }); // End of Question Prompt
}; // End of getTweets()

////////////////////////////// Function for displaying Song infomation ////////////////////////////////
function spotifyThisSong (){
  // Prompt the user for input
  inquirer.prompt(questionObject.spotifyQuestions).then(function(answers) {
    logtxt(answers);
    spotify.search({ type: 'track', query: answers.song, limit: answers.limit}, function(err, data) {
        // Throw error if query has failed
        if (err) {
          return console.log('Error occurred: ' + err);
          reset();
        };
        // Traverse through the data object and store items property in currentSong
        currentSong = data.tracks.items;
        // Counter to keep track of the # songs displayed
        var songCount = 0;

        let jsonSong = JSON.stringify(currentSong); // Converts Back to JSON String
        logtxt(answers.song, answers.limit); // Log the Response
        logtxt(jsonSong); // Log the Tweets

        // Loop through the data of each song and display it
        currentSong.forEach((song) => {songCount++; return console.log(`
          Song ${songCount}
          -------------------------------------------------------------------------------
          Artist: ${JSON.stringify(song.artists.map(artists => artists.name).join(", "))}
          Title: ${JSON.stringify(song.name)}
          Preview Link: ${JSON.stringify(song.preview_url)}
          Album Name: ${JSON.stringify(song.album.name)}
          --------------------------------------------------------------------------------
      `)}); // End of forEach

        reset();
    }); // End of Spotify Query
  }); // End of Prompt
}; // End of Function spotifyThisSong()

////////////////////////////////////// Function for OMDB search /////////////////////////////////////
function omdbSearch(){
  inquirer.prompt(questionObject.omdbQuestions).then(function(answers){   // Prompt User for Movie Input
    logtxt(answers.movieName);
    var queryUrl = "http://www.omdbapi.com/?t=" + answers.movieName + "&y=&plot=long&apikey=40e9cece";     // Build query variable
    requestObject(queryUrl, function (error, response, body) {
        if (error){
          console.log('error:', error); // Print the error if one occurred
          reset();
        };

        body = JSON.parse(body); // convert body response into a Javascript Object

        let jsonMovie = JSON.stringify(body); // Converts Back to JSON String
        logtxt(answers.movieName); // Log the Response
        logtxt(jsonMovie); // Log Movie Info

        //Display movie details
        //Rotten Tomatoes is down. Rotten Tomatotes Rating: ${body.Ratings[1].Value}
        console.log(`
                      Movie Title: ${body.Title}
          -----------------------------------------------
          Year of Release: ${body.Year}
          -----------------------------------------------
          IMDB Rating: ${body.Ratings[0].Value}
          IMDB Votes: ${body.imdbVotes}
          ------------------------------------------------
          Countries of Origin: ${body.Country}
          Languages: ${body.Language}
          -------------------------------------------------
          Plot: ${body.Plot}
          -------------------------------------------------
          Actors: ${body.Actors}
          `);
        reset();
    }); // End of OMDB Query
  }); // End of Prompt
}; // End of Function omdbSearch()

////////////////////////////////// Function for Choosing Random Command /////////////////////////////////
function randomCommand(){
  fs.readFile("./random.txt", "utf8", function(error, data){
    if (error){
      return console.log(`Error: ${error}`);
      reset();
    }
    // Store text from file into an array
    var commandArray = data.split(",");
    // Choose a random command from the array and remove white space
    var command = commandArray[Math.floor(Math.random()*commandArray.length)].replace(/\s/g, '');
    console.log(command);
    getCommand(command);
  }); // End of Read File Function
}; // End of randomCommand()

////////////////////////////////////// getCommand Function ///////////////////////////////////////
function getCommand(command){
  command = command.replace(/-/g, "").replace(/\s/g, "").toLowerCase(); // Remove dashes and whitespace to allow user to input commands without dash or space and in CAPS
  switch (command) {
    case "mytweets":
      getTweets()
      logtxt(command)
      break;
    case "spotifythissong":
      spotifyThisSong();
      logtxt(command)
      break;
    case "moviethis":
      omdbSearch();
      logtxt(command)
      break;
    case "dowhatitsays":
      randomCommand();
      logtxt(command)
      break;
    default:
      console.log("Not a valid Command Input!");
      logtxt("Not a valid Command Input!");
      inquirer.prompt(questionObject.commandQuestion).then(function(answer){
        command = (answer.reset).toLowerCase();
        getCommand(command);
      });
  }; // End Switch
}; // End of getFunction()

/////////////////////////////// Reset Function ///////////////////////////////////
function reset(){
  inquirer.prompt(questionObject.resetQuestions).then(function(answer){
    if ((answer.reset).toLowerCase().slice(0,1) == "y"){
      inquirer.prompt(questionObject.commandQuestion).then(function(answer){
        command = (answer.reset).toLowerCase();
        getCommand(command);
      });
    } else {
      console.log("Thank you for using LIRI. Have a nice day!")
      process.exit();
    };
  });
}; //End of Function reset()

/////////////// Function for getting input if there is no initial command //////////////////////
function askQuestion(){
  inquirer.prompt(questionObject.commandQuestion).then(function(answer){
    command = (answer.reset).toLowerCase();
    getCommand(command);
  });
} // End of askQuesion()

////////////////// Function for logging Commands Executed onto Log.text /////////////////////////
function logtxt(command){
  fs.appendFile("log.txt", command +"," , function(error){
    if (error){
      return console.log(`Error ${error}`);
    }
  });
}; // End of logtxt()

///////////////////////////////////// /* Export Functions */ ////////////////////////////////////////////////////////////

module.exports.getCommand = getCommand;
module.exports.askQuestion = askQuestion;
