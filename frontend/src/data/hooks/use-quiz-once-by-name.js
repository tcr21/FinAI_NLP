import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function useQuizOnceByName(tagName) {
  const [quizState, setQuizState] = useState({
    status: "loading",
    snapshot: null,
    error: null,
  });

  useEffect(() => {
    async function getDocument() {
      setQuizState({
        status: "loading",
        snapshot: null,
        error: null,
      });
      try {
        // Get gives promise to doc snapshot
        const q = query(
          collection(db, "Quizzes"),
          where("tags", "array-contains-any", tagName) // Tested and works with right tag input
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          setQuizState({
            status: "success",
            snapshot: snapshot,
            error: null,
          });
        });
      } catch (error) {
        console.error(error);
        setQuizState({ status: "error", snapshot: null, error });
      }
    }
    getDocument();
  }, [tagName]); // Should this be empty?

  const { status, snapshot, error } = quizState;

  let results = [];
  if (snapshot) {
    results = snapshot.docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        data: docSnapshot.data(),
      };
    });
  }

  return {
    status,
    snapshot,
    error,
    results,
    isEmpty: results.length === 0,
  };
}

export default useQuizOnceByName;
