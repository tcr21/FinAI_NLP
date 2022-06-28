// ============= Variables =============

// Examples

// Numbers
const userScore = 10;
const currentTemperature = -10.25;

// Strings
const welcomeMessage = "Welcome to the site.";
const announcement = "Sale! Today only!";
const scoreMessage = `The user score is ${userScore}`; // Template string
console.log(scoreMessage);

// Booleans
const isReady = true;
const isSnowing = false;

// Arrays
const topScore = [10, 20, 22];
const data = [10, true, "Hi"];

// Naming conventions
// - camelCase for variables, functions, instances
// - PascalCase for classes, components

// // Prompt
// const userName = prompt("What is your name?");
// // Bottom of web page
// // Note have to use `` when there is a variable
// document.body.insertAdjacentHTML("beforeEnd", `<h1>Welcome, ${userName}<h1>`);

// // Calculations
// const item1 = prompt("What is the cost of item 1?");
// const item2 = prompt("What is the cost of item 2?");
// const item3 = prompt("What is the cost of item 3?");
// // Prompt produces string so if don't parse will get concatenate not sum
// const subtotal =
//   Number.parseFloat(item1) +
//   Number.parseFloat(item2) +
//   Number.parseFloat(item3);
// console.log(`The subtotal for your purchase is $${subtotal}`);

// Declaring variables
// const: cannot reassign
// let: identifiers are allowed to be reassigned
// var: don't use

const numItems = 4;
// Error
// numItems = 3;

let numLives = 5;
console.log(`You have ${numLives} lives remaining...`);
numLives += 1;
// numLives++;
// ++numLives;
console.log(`You have ${numLives} lives remaining...`);
numLives -= 2;
console.log(`You have ${numLives} lives remaining...`);

let currentOpponnent = null; // can also use undefined
// Later in code...
currentOpponnent = "Goblin";

// Note cannot use variables from this file in index file for ex
// Will learn to export classes and variables to other files
