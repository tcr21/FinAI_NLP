import { firebase } from "../../firebase";

const microfinanceQuiz = {
  id: "1111111117FlfwaIcmip",
  data: {
    title: "Microfinance",
    description:
      "Learn about microfinancing, microfinance institutions, and what standards you should expect and check when working with them",
    difficulty: "hard",
    tags: ["borrowing", "finance products"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is microfinance?",
        correctAnswer:
          "A banking service for low-income individuals who are excluded from traditional financial services",
        incorrectAnswers: [
          "The same thing as traditional financial services",
          "A source of money that can be borrowed for free",
          "The only solution to financial hardship and economic crisis",
        ],
      },
      {
        question: "Do microfinance institutions have to respect ethical lending practices?",
        correctAnswer:
          "Yes",
        incorrectAnswers: [
          "No",
        ],
      },
      {
        question: "Do microfinance institutions need to have a license to legally lend money to borrowers?",
        correctAnswer:
          "Yes",
        incorrectAnswers: [
          "No",
        ],
      },
      {
        question: "What was the initial purpose of microfinance?",
        correctAnswer:
          "Microfinance was originally developed as a measure to alleviate poverty",
        incorrectAnswers: [
          "Microfinance was developed to make profits off of a broader range of people",
        ],
      },
      {
        question: "What conditions should I be checking with a microfinance institutions?",
        correctAnswer: "That they are licensed and that their interest and fees are comparable to other institutions",
        incorrectAnswers: [
          "Usually any institution close to my local community should be fine and does not need to be checked",
        ],
      },
    ],
  },
};

export default microfinanceQuiz;
