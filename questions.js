/////////////////////////////// /* Questions for Inquirer */ ////////////////////////////////////////////////////

var questionObject = {

  // Twiter Questions
  twitterQuestions : [{
      type: "input",
      message: "Please input a Twitter Username: ",
      name: "twitterName",
      validate: function(value) { // Validation to ensure user does not submit empty input.
        return value.length > 1? true : "Please Input a username!";
      }
    },
    {
        type: "input",
        message: "How many Tweets do you want to display?: ",
        name: "limit",
        default: "20",
        validate: function(value){
          return Number.isInteger(value)? true : "Invalid Input! Please input a whole number!"
        }
    }],

  // Spotify Questions
  spotifyQuestions : [{
      type: "input",
      message: "What is the name of the Song you are trying to find?: ",
      name: "song",
      default: "The Sign"
    },
    {
        type: "input",
        message: "How many songs do you want to display?: ",
        name: "limit",
        default: "1",
        validate: function(value){
          return Number.isInteger(value)? true : "Invalid Input! Please input a whole number!"
        }
    }
  ],

  // OMDB Questions
  omdbQuestions : [{
    type: "input",
    message: "What is the name of the Movie your are trying to find?: ",
    name: "movieName",
    default: "Mr. Nobody"
  }],

  // Reset Questions
  resetQuestions : [{
    type: "input",
    message: "Do you want to run another command? (yes / no): ",
    name: "reset",
    validate: (value) => (value.toLowerCase().slice(0,1) == "y") || value.toLowerCase().slice(0,1) == "n" ? true : console.log("Please input either yes or no")
  }],

  // Get Command Questions
  commandQuestion : [{
    type: "input",
    message: `Please enter one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says: `,
    name: "reset"
  }]
}; // End of Question Object


module.exports = questionObject;
