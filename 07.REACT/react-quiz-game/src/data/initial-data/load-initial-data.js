import { db } from "../firebase";
import quizzes from "./initial-quizzes";

/**
 * This is intended to be a very simple way to load some sample data into a Firestore database. It
 * will inject quizzes under set keys. This could potential override existing data! You should not
 * run this in production. If you want a better way to manage data during development, check out
 * Firebase's local development tool
 */
async function loadData() {
  console.log("Loading quizzes into Firestore...");

  for (let quizData of quizzes) {
    const { id, data } = quizData;
    try {
      await db.collection("Quizzes").doc(id).set(data);
    } catch (error) {
      console.error(error);
      console.error("Could not load data!");
      return;
    }
  }

  console.log("Done loading quizzes!");
}

export default loadData;
