// Real game
import triviaItems from "./trivia-items.js";
import shuffle from "./shuffle.js";

const scoreElement = document.querySelector("#score");
const questionNumberElement = document.querySelector("#question-number");
const triviaContainer = document.querySelector("#trivia-container");
const triviaItemTemplate = document.querySelector("#trivia-item-template");
let score = 0;
let triviaItemIndex = 0;

// Keep score variable in synch with UI
function updateScore(newScore) {
  score = newScore;
  scoreElement.textContent = score;
  // TO DO: animate this (to draw attention to score change)
}

// Keep index in synch with UI
function updateQuestionNumber() {
  const questionNum = triviaItemIndex + 1;
  const totalNumQuestions = triviaItems.length;
  questionNumberElement.textContent = `${questionNum}/${totalNumQuestions}`;
}

// Clone template and fill it in with trivia item
function displayTriviaItem() {
  const triviaItem = triviaItems[triviaItemIndex];
  // Object destructuring with renaming properties
  const {
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = triviaItem;

  // Create shuffled answers
  const allAnswers = shuffle([correctAnswer, ...incorrectAnswers]);

  const triviaItemElement = triviaItemTemplate.content.cloneNode(true);

  const questionElement = triviaItemElement.querySelector(
    ".trivia-item__question"
  );
  questionElement.innerHTML = question;

  const buttonElements = triviaItemElement.querySelectorAll(
    ".trivia-item__button"
  );
  // Note would need to restructure if not 4 options since HTML assumes 4
  buttonElements.forEach((button, index) => {
    button.innerHTML = allAnswers[index];
    button.addEventListener("click", onAnswerClicked);
  });

  triviaContainer.appendChild(triviaItemElement);

  const triviaDiv = triviaContainer.querySelector(".trivia-item");
  const keyframes = [{ opacity: 0 }, { opacity: 1 }];
  const options = {
    duration: 500,
    easing: "ease-out",
  };
  const animation = triviaDiv.animate(keyframes, options);
}

// Check if answer picked was correct or incorrect
function onAnswerClicked(event) {
  const target = event.target;
  const selectedAnswer = target.innerHTML; // using innerHTML vs textContent. We are using inner HTML above
  const triviaItem = triviaItems[triviaItemIndex];
  const correctAnswer = triviaItem.correct_answer;

  // Disable button elements once clicked for that question
  const buttonElements = triviaContainer.querySelectorAll(
    ".trivia-item__button"
  );
  buttonElements.forEach((button) => {
    button.disabled = true;
    button.classList.add("trivia-item__button--disabled");
  });

  if (selectedAnswer == correctAnswer) {
    console.log("Correct!");
    updateScore(score + 1);
    target.classList.add("trivia-item__button--correct");
  } else {
    console.log("Incorrect!");
    target.classList.add("trivia-item__button--incorrect");
  }

  const triviaDiv = triviaContainer.querySelector(".trivia-item");
  const keyframes = [{ opacity: 1 }, { opacity: 0 }];
  const options = {
    duration: 500,
    delay: 500,
    easing: "ease-in",
  };
  const animation = triviaDiv.animate(keyframes, options);

  // Move to next question when fading animation finishes
  animation.addEventListener("finish", () => {
    clearTrivia();
    triviaItemIndex += 1;
    // Need to ensure don't go past length of array
    if (triviaItemIndex === triviaItems.length) {
      alert(`Game over. Your final score is ${score}.`);
    } else {
      displayTriviaItem();
      updateQuestionNumber();
    }
  });
}

// Clear trivia items from page (before adding new one)
function clearTrivia() {
  for (const child of triviaContainer.children) {
    triviaContainer.removeChild(child);
  }
}

updateScore(0);
updateQuestionNumber();
displayTriviaItem();

// // Testing

// console.log(
//   scoreElement,
//   questionNumberElement,
//   triviaContainer,
//   triviaItemTemplate
// );
// scoreElement.textContent = 10;
// questionNumberElement.textContent = "2 / 15";
// triviaContainer.insertAdjacentHTML("beforeend", "<p>Testing!</p>");

// const testTriviaItem = triviaItemTemplate.content.cloneNode(true);

// const questionElement = testTriviaItem.querySelector(".trivia-item__question");
// questionElement.innerHTML =
//   "When Magic: The Gathering was first solicited, which of the following was it originally titled?";

// const buttonElements = testTriviaItem.querySelectorAll(".trivia-item__button");
// buttonElements[0].innerHTML = "Magic";
// buttonElements[1].innerHTML = "Magic Clash";
// buttonElements[2].innerHTML = "Mana Duels";
// buttonElements[3].innerHTML = "Mana Clash";
// triviaContainer.appendChild(testTriviaItem);

// React is more function than object oriented
