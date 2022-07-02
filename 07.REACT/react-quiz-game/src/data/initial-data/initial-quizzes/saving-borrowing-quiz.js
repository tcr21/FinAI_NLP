import { firebase } from "../../firebase";

const savingBorrowingQuiz = {
  id: "1111111112FlfwaIcmip",
  data: {
    title: "Saving & borrowing",
    description:
      "Learn about about saving and borrowing money to improve your finances.",
    difficulty: "easy",
    tags: ["saving & borrowing"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("Sat 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("Jan 02, 2021")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is saving money?",
        correctAnswer:
          "Putting money aside for my long-term future expenses, each time I receive income",
        incorrectAnswers: [
          "Giving my money to my family members in order to support them",
          "Putting money aside for the expenses next week",
          "",
        ],
      },
      {
        question: "What is borrowing money?",
        // TO DO: ANSWERS FROM HERE
        correctAnswer: "The amount of money I can borrow",
        incorrectAnswers: [
          "The amount of money I owe",
          "Something I have to repay immediately",
          "An alternative to saving",
        ],
      },
      {
        question: "What is an interest rate?",
        correctAnswer:
          "A payment card that charges against the amount of money I can borrow and repay later",
        incorrectAnswers: [
          "A payment card that charges against the cash I have in my bank account",
        ],
      },
      {
        question: "What is a maximum reasonable interest rate?",
        correctAnswer:
          "A payment card that charges against the cash I have in my bank account",
        incorrectAnswers: [
          "A payment card that charges against the amount of money I can borrow and repay later",
        ],
      },
      {
        question: "Who should I turn to if I need to borrow money?",
        correctAnswer:
          "A way to safeguard me or my property against risk of loss, damage or theft",
        incorrectAnswers: [
          "An optional fee charged by some financial institutions",
        ],
      },
    ],
  },
};

export default savingBorrowingQuiz;
