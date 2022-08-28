import { firebase } from "../../firebase";

const savingBudgetingQuiz = {
  id: "1111111113FlfwaIcmip",
  data: {
    title: "Saving & budgeting",
    description:
      "Learn about saving and budgeting to improve your personal finance skills.",
    difficulty: "easy",
    tags: ["saving"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 27, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "What is budgeting?",
        correctAnswer:
          "Creating a plan of how to spend and save your money",
        incorrectAnswers: [
          "Something that a bank does for me",
          "A plan I need to make only if there is economic crisis",
          "A way of earning more money",
        ],
      },
      {
        question: "What is usually the largest expense in a person's budget?",
        correctAnswer:
          "Housing",
        incorrectAnswers: [
          "Food and drink",
          "Health",
          "Transport",
        ],
      },
      {
        question: "What is a good habit when it comes to saving?",
        correctAnswer:
          "Putting money aside each month when I get paid",
        incorrectAnswers: [
          "Putting money aside once a year",
          "Putting money aside only if I have a big expense in mind",
          "Putting money aside only if I don't want to spend it on anything else",
        ],
      },
      {
        question: "Rent is considered a:",
        correctAnswer:
          "Fixed expense",
        incorrectAnswers: [
          "Variable expense",
        ],
      },
      {
        question: "Food shopping is considered a:",
        correctAnswer: "Variable expense",
        incorrectAnswers: [
          "Fixed expense",
        ],
      },
    ],
  },
};

export default savingBudgetingQuiz;
