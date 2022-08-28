import { firebase } from "../../firebase";

const savingBorrowingQuiz = {
  id: "1111111112FlfwaIcmip",
  data: {
    title: "Saving & borrowing",
    description:
      "Learn about about saving and borrowing money to improve your finances.",
    difficulty: "easy",
    tags: ["saving", "borrowing"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("July 03, 2022")
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
          "Spending money on household expenses",
          "Using any extra money available",
        ],
      },
      {
        question: "What is a loan?",
        correctAnswer:
          "When money is given to me in exchange for repayment of that money over an agreed amount of time plus interest",
        incorrectAnswers: [
          "When money is given to me in exchange for me repaying it as soon as I am asked to do so",
          "When money is given to me in exchange for me repaying it plus any additional amount deemed appropriate by loan provider",
          "An alternative to saving money each month",
        ],
      },
      {
        question: "What is an interest rate?",
        correctAnswer:
          "The cost of borrowing money, typically a percentage of the amount of money I borrow, agreed with the loan provider",
        incorrectAnswers: [
          "Any amount of money that the lender claims I owe them on top of the amount of money I borrowed",
        ],
      },
      {
        question: "What is a typical range for an interest rate?",
        correctAnswer: "~5-25% of the amount of money I borrowed",
        incorrectAnswers: [
          "35-220% of the amount of money I borrowed",
          "~0-5% of the amount of money I borrowed",
          "Any flat fee required by the loan provider",
        ],
      },
      {
        question: "Who should I turn to if I need to borrow a lot of money?",
        correctAnswer:
          "A bank, a licensed microfinance institution, or reliable friends and family",
        incorrectAnswers: [
          "Any microfinance institution that offers loans",
          "Any institution that is willing, regardless of the interest rate and fees they require",
          "Anyone who agrees to lend me money",
        ],
      },
    ],
  },
};

export default savingBorrowingQuiz;
