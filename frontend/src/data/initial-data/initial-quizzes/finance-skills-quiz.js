import { firebase } from "../../firebase";

const financeSkillsQuiz = {
  id: "1111111110FlfwaIcmip",
  data: {
    title: "Financial skills",
    description:
      "Learn about different financial skills that can help you with your personal finance",
    difficulty: "hard",
    tags: ["borrowing", "finance products", "savings"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is saving?",
        correctAnswer:
          "Putting money aside for the future",
        incorrectAnswers: [
          "Spending money as soon as it is earned",
          "Giving money away whenever someone needs it",
          "Only spending money on things that me or my family need",
        ],
      },
      {
        question: "What is budgeting?",
        correctAnswer:
          "Planning my income and expenses over a period of time",
        incorrectAnswers: [
          "A source of income",
        ],
      },
      {
        question: "What is the point of using bank cards?",
        correctAnswer:
          "To build a transaction history for when I need to take out a loan",
        incorrectAnswers: [
          "To have an unlimited amount of money available for spending",
        ],
      },
      {
        question: "What should I do when I take out a loan?",
        correctAnswer:
          "I should negotiate loan terms with my loan provider and compare their interest rates with other providers",
        incorrectAnswers: [
          "I should just trust what my loan provider says, they are experts",
        ],
      },
      {
        question: "How can I plan for retirement?",
        correctAnswer: "I can save money consistently each month, and calculate how much I need to live without an income for a set number of years",
        incorrectAnswers: [
          "I can assume that my family will have enough to take care of my when I am old",
        ],
      },
    ],
  },
};

export default financeSkillsQuiz;
