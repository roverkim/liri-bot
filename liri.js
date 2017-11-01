//////////////////////////////////// Main Page ////////////////////////////////////////////////

//////////////////////// /* Require Internal Package Functions */ ////////////////////////////
const liriFunctions = require('./functions.js');

// Grabs Input from Command Line, starting from 2'nd index and stores the array in a variable
var commandInput = process.argv.slice(2);

// Condition to check if user has runned the program without initializing a command. If no command has been given, execute askQuestion()
commandInput.length == 0? liriFunctions.askQuestion() : liriFunctions.getCommand(commandInput[0]);
