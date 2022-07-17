import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, query, where, getDocs } from "firebase/firestore";

function useQuizOnceByName(quizName) {
  const [quizState, setQuizState] = useState({
    status: "loading",
    snapshot: null,
    error: null,
  });

  useEffect(() => {
    async function getDoc() {
      setQuizState({ status: "loading", snapshot: null, error: null });
      try {
        // TO FIX
        // Get gives promise to doc snapshot
        // const snapshot = await db
        //   .collection("Quizzes")
        //   .where("title", "==", quizName) // TBC if works, Changed here
        //   .doc(quizId)
        //   .get();
        // Alternative to try:
        const q = await query(
          db.collection("Quizzes"),
          where("title", "==", quizName)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });

        setQuizState({ status: "success", snapshot, error: null });
      } catch (error) {
        console.error(error);
        setQuizState({ status: "error", snapshot: null, error });
      }
    }
    getDoc();
  }, [quizName]); // When quizName changes, we do a new get

  console.log(quizState);

  const { status, snapshot, error } = quizState;

  let id;
  let exists;
  let data;
  // See documentation on DocSnapshot
  // Our defined API
  if (snapshot) {
    id = snapshot.id;
    exists = snapshot.exists;
    data = snapshot.data();
  }

  // Note firebase will not throw error if collection id does not exist, but exists boolean below will be false
  return {
    id,
    exists,
    data,
    status,
    error,
  };
}

export default useQuizOnceByName;
