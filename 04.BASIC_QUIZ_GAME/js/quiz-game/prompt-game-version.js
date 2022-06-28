import shuffle from "./shuffle.js"; // choosing to import as name shuffle. Used here to shiffle array

// ====Basic Arrays & Loops====

// // Player history of scores
// const playerScores = [12, 13, 11, 9, 13];

// console.log(`First score: ${playerScores[0]}`);

// // Loop 1
// for (let i = 0; i < playerScores.length; i++) {
//   console.log(`Score ${i} is ${playerScores[i]}`);
// }

// // Loop 2 (alternative)
// for (const score of playerScores) {
//   console.log(score);
//   // Don't have access to index
// }

// // Loop 3 (alternative)
// function printScore(score, index, array) {
//   console.log(`Score ${index} is ${score}`);
// // Cannot exit forEach early with break statement
// }
// playerScores.forEach(printScore);

// ====Questions Array=======

// const questions = [
//   { text: "Is 220% a reasonable interest rate?", answer: "No" },
//   { text: "Is saving better than spending and borrowing?", answer: "Yes" },
//   {
//     text: "Is it advantageous to use a formal bank if possible?",
//     answer: "Yes",
//   },
// ];

// questions.forEach((question, index) => {
//   //   console.log(index);
//   //   console.log(question.text);
//   //   console.log(question.answer);
//   //   const text = question.text;
//   //   const answer = question.answer;

//   // Object destructuring:
//   const { text, answer } = question;
//   const playerAnswer = prompt(text);
//   // === to compare is strict equality (reccommended). == Java tries to convert both elements to same type but leads to lots of bugs
//   if (playerAnswer === answer) {
//     alert("Correct!");
//   } else {
//     alert("Wrong!");
//   }
// });

// ====Trivia game in prompts=====

const triviaItems = [
  {
    category: "Entertainment: Board Games",
    type: "multiple",
    difficulty: "easy",
    question: "How many spaces are there on a standard Monopoly board?",
    correct_answer: "40",
    incorrect_answers: ["28", "55", "36"],
  },
  {
    category: "Entertainment: Board Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "When Magic: The Gathering was first solicited, which of the following was it originally titled?",
    correct_answer: "Mana Clash",
    incorrect_answers: ["Magic", "Magic Clash", "Mana Duels"],
  },
  {
    category: "Entertainment: Board Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the maximum level you can have in a single class in Dungeons and Dragons (5e)?",
    correct_answer: "20",
    incorrect_answers: ["30", "15", "25"],
  },
];

let score = 0;

triviaItems.forEach((triviaItem, index) => {
  const { question, correct_answer, incorrect_answers } = triviaItem;
  const allAnswers = shuffle([correct_answer, ...incorrect_answers]); // Spreads
  console.log(question);
  console.log(correct_answer);
  // console.log(incorrect_answers);
  console.log(allAnswers);

  let questionText = `==============
  Question number: ${index}
  Score: ${score}
  ==============
  ${question}
  ${allAnswers.join(" | ")}
  `;
  const playerAnswer = prompt(questionText);
  if (playerAnswer === correct_answer) {
    score += 1;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
});
