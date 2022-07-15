import { useEffect, useState } from "react";
import { db } from "../firebase";

// TO DO IN FUTURE IF MORE COLLECTIONS:
// If need to use multiple collections, then make this function, pass in collection reference, and run off logic below
// Then have useQuizzesOnce return that useCollectionFunction
// function useCollectionOnce(collection) {}

// function useQuizzesOnce(){
//     return useCollectionOnce("Quizzes");
// }

// TO DO IN FUTURE IF WANT COMPONENT TO LISTEN IN REAL TIME:
// function useQuizzesSubscription (that uses quizzes real time)
// See docs on how to do it

// With Firebase, can real time subscribe to collection and get notified when changes OR just get data once when component mounts, which is what we want here
function useQuizzesOnce() {
  // Note can pass difficulty as parameter to filter, and then add to dependency (empty array under UseEffect)
  const [quizzes, setQuizzes] = useState({
    status: "loading",
    snapshot: null,
    error: null,
  });

  // Can't make useEffect asynchronous but do one inside
  useEffect(() => {
    async function getCollection() {
      setQuizzes({ status: "loading", snapshot: null, error: null });
      try {
        const snapshot = await db.collection("Quizzes").get();
        setQuizzes({ status: "success", snapshot, error: null });
      } catch (error) {
        console.error(error);
        setQuizzes({ status: "error", snapshot: null, error });
      }
    }
    getCollection();
  }, []); // empty dependency array to indicate only run when component mounts

  const { status, snapshot, error } = quizzes;

  // Transform from firebase to our own API/ fields
  let results = [];
  if (snapshot) {
    results = snapshot.docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        data: docSnapshot.data(),
      };
    });
  }
  // Control what we want to return here
  return {
    status,
    error,
    results,
    isEmpty: results.length === 0,
  };
}

export default useQuizzesOnce;
