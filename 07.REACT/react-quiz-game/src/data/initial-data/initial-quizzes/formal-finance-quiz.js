import { firebase } from "../../firebase";

const formalFinanceQuiz = {
  id: "1111111111FlfwaIcmip",
  data: {
    title: "Formal finance",
    description:
      "Learn about the main products offered by banks and other formal financial institutions.",
    difficulty: "easy",
    tags: ["formal finance"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("July 03, 2022")
    ),
    ownerId: "1111111111TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is a bank account?",
        correctAnswer:
          "The record my bank keeps to know how much money I have given them to look after",
        incorrectAnswers: [
          "A way for banks to collect money from me",
          "A calculator to know how much I can spend",
          "A payment method",
        ],
      },
      {
        question: "What is credit?",
        correctAnswer: "The amount of money I can borrow",
        incorrectAnswers: [
          "The amount of money I owe",
          "Something I have to repay immediately",
          "An alternative to saving",
        ],
      },
      {
        question: "What is a credit card?",
        correctAnswer:
          "A payment card that charges against the amount of money I can borrow and repay later",
        incorrectAnswers: [
          "A payment card that charges against the cash I have in my bank account",
        ],
      },
      {
        question: "What is a debit card?",
        correctAnswer:
          "A payment card that charges against the cash I have in my bank account",
        incorrectAnswers: [
          "A payment card that charges against the amount of money I can borrow and repay later",
        ],
      },
      {
        question: "What is insurance?",
        correctAnswer:
          "A way to safeguard me or my property against risk of loss, damage or theft",
        incorrectAnswers: [
          "An optional fee charged by some financial institutions",
        ],
      },
    ],
  },
};

export default formalFinanceQuiz;
