import { firebase } from "../../firebase";

const savingQuiz = {
  id: "1111111118FlfwaIcmip",
  data: {
    title: "Saving",
    description:
      "Learn about good saving practices, and how saving can contribute to supporting you and your family",
    difficulty: "easy",
    tags: ["saving"],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date("July 02, 2022")),
    lastModifiedAt: firebase.firestore.Timestamp.fromDate(
      new Date("August 28, 2022")
    ),
    ownerId: "1111111112TpivifTwaaot",
    ownerName: "Tiphaine",
    questions: [
      {
        question: "Should I include saving in my budget?",
        correctAnswer:
          "Yes",
        incorrectAnswers: [
          "No",
        ],
      },
      {
        question: "I should set saving goals for:",
        correctAnswer:
          "Both the short, medium and long term",
        incorrectAnswers: [
          "The short term",
          "The medium term",
          "The long term",
        ],
      },
      {
        question: "Saving money can:",
        correctAnswer:
          "Safeguard me and my family in case there is an unexpected economic downturn or financial concern, and allow me to plan for future expenses",
        incorrectAnswers: [
          "Help me to an extent but it isn't really necessary to save money unless an economic issue arises",
        ],
      },
      {
        question: "I should try to save money:",
        correctAnswer:
          "Every month when I am paid",
        incorrectAnswers: [
          "Once a year",
        ],
      },
      {
        question: "Saving money helps protect:",
        correctAnswer: "Me and my family",
        incorrectAnswers: [
          "Just myself",
        ],
      },
    ],
  },
};

export default savingQuiz;
