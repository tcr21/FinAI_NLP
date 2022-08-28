import { firebase } from "../../firebase";

const digitalBankingQuiz = {
  id: "1111111119FlfwaIcmip",
  data: {
    title: "Digital banking",
    description:
      "Learn about what digital banking is, its usage, and its advantages and disadvantages",
    difficulty: "medium",
    tags: ["finance products"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is digital banking?",
        correctAnswer:
          "Digital banking means combining traditional banking with online services available on a website or mobile application",
        incorrectAnswers: [
          "Digital banking is an illegitimate, unreliable way of providing financial services online",
        ],
      },
      {
        question: "What is mobile banking?",
        correctAnswer:
          "Using a mobile device to make financial transactions",
        incorrectAnswers: [
          "Reading about banking on my mobile",
        ],
      },
      {
        question: "How widely are digital payments used?",
        correctAnswer:
          "2/3 of the adult population worldwide makes or receives digital payments",
        incorrectAnswers: [
          "Only 10% of the global population uses digital payments",
        ],
      },
      {
        question: "What are some advantages of digital banking?",
        correctAnswer:
          "It is fast and efficient, it allows you to make payments and transfer money through a few clicks without any transport costs",
        incorrectAnswers: [
          "It means I don't need to check my account balance and it takes care of budgeting for me",
        ],
      },
      {
        question: "What are some disadvantages of digital banking?",
        correctAnswer: "There can be technology disruptions, and privacy and security concerns if the online banking system is attacked",
        incorrectAnswers: [
          "It is untrustworthy and unreliable, and not as legitimate as in-person banking",
        ],
      },
    ],
  },
};

export default digitalBankingQuiz;
