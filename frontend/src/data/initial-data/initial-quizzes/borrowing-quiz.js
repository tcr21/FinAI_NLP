import { firebase } from "../../firebase";

const borrowingQuiz = {
  id: "1111111115FlfwaIcmip",
  data: {
    title: "Borrowing",
    description:
      "Learn about what borrowing money means, how it works, and what key components of borrowing you should understand",
    difficulty: "medium",
    tags: ["borrowing"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is the money you owe called?",
        correctAnswer:
          "Debt",
        incorrectAnswers: [
          "Income",
          "Expenses",
          "Assets",
        ],
      },
      {
        question: "What is a loan?",
        correctAnswer:
          "Something borrowed, usually money that needs to be paid back with interest",
        incorrectAnswers: [
          "An amount of money that is given to me for free",
          "An alternative source of income to having a job",
          "Something I should resort to as the best source of income",
        ],
      },
      {
        question: "What is interest?",
        correctAnswer:
          "One of the costs of borrowing money, usually a percentage of the amount I borrow",
        incorrectAnswers: [
          "An amount of money I receive when opening a bank account",
          "The cost of making a payment",
          "The amount of money I borrowed from my loan provider",
        ],
      },
      {
        question: "What is a loan term?",
        correctAnswer:
          "The amount of time I have to repay my loan",
        incorrectAnswers: [
          "The date when I borrowed money",
        ],
      },
      {
        question: "What are loan terms and conditions?",
        correctAnswer: "The conditions agreed upon when borrowing money eg. interest rate, fees, loan term",
        incorrectAnswers: [
          "Any demands my loan provider might have each month with regards to my loan",
        ],
      },
    ],
  },
};

export default borrowingQuiz;
