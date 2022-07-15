import { useEffect, useState } from "react";
import { db } from "../firebase";

function useQuizOnce(quizId) {
  const [quizState, setQuizState] = useState({
    status: "loading",
    snapshot: null,
    error: null,
  });

  useEffect(() => {
    async function getDoc() {
      setQuizState({ status: "loading", snapshot: null, error: null });
      try {
        // Get gives promise to doc snapshot
        const snapshot = await db.collection("Quizzes").doc(quizId).get();
        setQuizState({ status: "success", snapshot, error: null });
      } catch (error) {
        console.error(error);
        setQuizState({ status: "error", snapshot: null, error });
      }
    }
    getDoc();
  }, [quizId]); // When quizId changes, we do a new get

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

export default useQuizOnce;
