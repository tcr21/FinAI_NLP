import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, query, where, getDocs } from "firebase/firestore";

function useQuizOnceByName(quizName) {
  const [quizState, setQuizState] = useState({
    status: "loading",
    snapshot: null,
    error: null,
    docID: null,
    docData: null,
  });

  useEffect(() => {
    async function getDocument() {
      setQuizState({
        status: "loading",
        snapshot: null,
        error: null,
        docID: null,
        docData: null,
      });
      try {
        // Get gives promise to doc snapshot
        const q = query(
          collection(db, "Quizzes"),
          where("title", "==", quizName.trim())
        );
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          // NOTE: if had multiple quizzes (docs) in snapshot, would be updating it to each doc and ultimately to the last doc
          setQuizState({
            status: "success",
            snapshot: snapshot,
            error: null,
            docID: doc.id,
            docData: doc.data(),
          });
        });
      } catch (error) {
        console.error(error);
        setQuizState({ status: "error", snapshot: null, error });
      }
    }
    getDocument();
  }, [quizName]);

  const { status, snapshot, error, docID, docData } = quizState;

  let exists;
  if (snapshot) {
    exists = snapshot.exists;
  }

  return {
    status,
    snapshot,
    error,
    docID,
    docData,
    exists,
  };
}

export default useQuizOnceByName;
