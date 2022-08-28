import { firebase } from "../../firebase";

const loanQuiz = {
  id: "1111111116FlfwaIcmip",
  data: {
    title: "Loans",
    description:
      "Learn about loans and specific loan terms to discuss with your loan provider",
    difficulty: "hard",
    tags: ["borrowing"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is annual percentage rate (APR)?",
        correctAnswer:
          "Yearly cost of a loan, expressed as a % of the loan amount, including all fees charged by the loan provider",
        incorrectAnswers: [
          "The same thing as interest",
          "Fees charged by the loan provider on top of interest",
          "The amount I borrowed in a year",
        ],
      },
      {
        question: "What is an interest rate?",
        correctAnswer:
          "One of the amounts charged by the loan provider as a cost of borrowing money, expressed as a % of the amount borrowed",
        incorrectAnswers: [
          "A proportion of my loan amount that I don't need to repay",
          "An amount that my loan provider can ask for each month, on top of my normal monthly repayment",
          "Twice the amount of my loan amount",
        ],
      },
      {
        question: "What are loan fees?",
        correctAnswer:
          "Up-front costs that the loan provider charges the borrower on top of interest, to process the loan",
        incorrectAnswers: [
          "The amount of money I have to repay my loan provider each month",
          "A variable cost that my loan provider can charge me each month, ontop of my monthly repayment",
          "The same thing as annual percentage rate (APR)",
        ],
      },
      {
        question: "How is my monthly loan repayment calculated?",
        correctAnswer:
          "The amount I borrowed plus interest, divided by my loan term expressed in months",
        incorrectAnswers: [
          "The loan provider determines it each month and it is not necessarily linked to the amount I borrowed",
        ],
      },
      {
        question: "What conditions should I be negotiating with my loan provider?",
        correctAnswer: "Interest, fees and annual percentage rate (APR)",
        incorrectAnswers: [
          "I should not negotiate with my loan provider",
        ],
      },
    ],
  },
};

export default loanQuiz;
