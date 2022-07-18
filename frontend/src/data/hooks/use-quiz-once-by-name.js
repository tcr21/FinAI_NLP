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
    async function getDocument() {
      setQuizState({
        status: "loading",
        snapshot: null,
        error: null,
        docID: null,
        docData: null,
      });
      try {
        // TO FIX
        // Get gives promise to doc snapshot
        console.log("QUIZ NAME", quizName);
        const q = query(
          collection(db, "Quizzes"),
          where("title", "==", quizName.trim()) // FIND BETTER ALTERNATIVE
        );
        console.log("TEST QUERY", q);
        const snapshot = await getDocs(q);
        console.log("QUERY SNAPSHOT", snapshot);
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("TEST DOCS");
          console.log(doc.id, " => ", doc.data());
          // TO CLEAN UP / TO FIX
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
  }, [quizName]); // When quizName changes, we do a new get. TO FIX

  console.log(quizState);

  const { status, snapshot, error, docID, docData } = quizState;

  // TO CLEAN UP / TO FIX
  // let id;
  // let exists;
  // let data;
  // // See documentation on DocSnapshot
  // // Our defined API
  // if (snapshot) {
  //   id = snapshot.id;
  //   exists = snapshot.exists;
  //   data = snapshot.data();
  // }

  // Note firebase will not throw error if collection id does not exist, but exists boolean below will be false
  // console.log("QUIZ ID", id);
  // return {
  //   id,
  //   exists,
  //   data,
  //   status,
  //   error,
  // };

  return {
    docID,
    docData,
  };
}

export default useQuizOnceByName;
