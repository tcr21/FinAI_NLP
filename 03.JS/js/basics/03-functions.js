// A function is re-usable block of code

// Declaration
function sayHello() {
  console.log("Our 1st function saying hello!");
}

// Invoking a function:
sayHello();

// Functions can take parameters
function greetUser(userName) {
  console.log(`Hello, ${userName}`);
}

greetUser("Mum");
greetUser("Dad");
greetUser(); // gives value of undefined

// Arrow syntax
const sayGoodbye = (userName) => {
  console.log("Goodbye!");
  console.log(`See you soon, ${userName}`);
};
sayGoodbye("Mum");
sayGoodbye("Dad");
sayGoodbye();

// Return number functions
const addNumbers = (num1, num2, num3) => {
  const sum = num1 + num2 + num3;
  return sum;
};

const sum1 = addNumbers(10, 20, 12);
console.log(`The sum is ${sum1}`);

const sum2 = addNumbers(1.5, 2.5, 1.25);
console.log(`The sum is ${sum2}`);
