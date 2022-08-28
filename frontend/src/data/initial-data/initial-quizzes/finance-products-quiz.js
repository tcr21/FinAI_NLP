import { firebase } from "../../firebase";

const financeProductsQuiz = {
  id: "1111111114FlfwaIcmip",
  data: {
    title: "Financial products",
    description:
      "Learn about different financial products as well as how they work and how they can help you",
    difficulty: "hard",
    tags: ["finance products"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 27, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is linked to a card owner's bank account and used to buy things?",
        correctAnswer:
          "Debit card",
        incorrectAnswers: [
          "Credit card",
          "Insurance card",
          "Social security card",
        ],
      },
      {
        question: "What is mobile banking?",
        correctAnswer:
          "Making payments or other financial transactions on a mobile device",
        incorrectAnswers: [
          "Learning about banking on my phone",
          "An unsafe way of making payments",
          "Buying a mobile phone",
        ],
      },
      {
        question: "What is a cheque book?",
        correctAnswer:
          "A small book with preprinted paper instruments issued to me by my bank for me to make payments",
        incorrectAnswers: [
          "Any piece of paper with an amount of money written on it",
        ],
      },
      {
        question: "What is an overdraft?",
        correctAnswer:
          "The ability to borrow money through my bank account by taking out more money than what I have",
        incorrectAnswers: [
          "Extra money that I can access from the bank for as long as I need, without any associated cost",
        ],
      },
      {
        question: "What is a savings account?",
        correctAnswer: "A deposit account to hold money for me and earn some interest",
        incorrectAnswers: [
          "The same thing as my main account",
        ],
      },
    ],
  },
};

export default financeProductsQuiz;
