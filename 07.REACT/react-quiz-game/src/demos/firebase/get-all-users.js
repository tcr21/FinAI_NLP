import { useEffect, useState } from "react";
import ErrorMessage from "../../common/error-message";
import LoadingSpinner from "../../common/loading-spinner";
import { db } from "../../data/firebase";
import User from "./user";

function GetAllUsers() {
  const [queryState, setQueryState] = useState({
    isLoading: true,
    errorMessage: "",
    docSnapshots: null,
  });

  useEffect(() => {
    async function getAllUsers() {
      try {
        setQueryState({
          isLoading: true,
          errorMessage: "",
          docSnapshots: null,
        });
        const snapshot = await db.collection("Users").get();
        const docSnapshots = snapshot.docs;
        setQueryState({
          isLoading: false,
          errorMessage: "",
          docSnapshots,
        });
      } catch (err) {
        setQueryState({
          isLoading: false,
          errorMessage: "Could not connect to database. Please try again.",
          docSnapshots: null,
        });
        console.error(err);
      }
    }
    getAllUsers();
  }, []);

  const { isLoading, errorMessage, docSnapshots } = queryState;

  let contents;
  if (isLoading) contents = <LoadingSpinner />;
  else if (errorMessage) contents = <ErrorMessage>{errorMessage}</ErrorMessage>;
  else
    contents = docSnapshots.map((doc) => (
      <User key={doc.id} data={doc.data()} />
    ));

  return (
    <div>
      <h3>Read all users</h3>
      {contents}
    </div>
  );
}

export default GetAllUsers;

// For ref:
// How to talk to Firebase and retrieve data from it using JS
// async function readAllUsers() {
//   try {
//     // Long way
//     // const collectionRef = db.collection("Users");
//     // const getPromise = collectionRef.get();
//     // const snapshot = await getPromise;

//     // Short way:
//     // const snapshot = await db.collection("users").get();

//     // Short way with filter on who is online
//     const snapshot = await db
//       .collection("Users")
//       .where("isOnline", "==", true) // allows us to filter to only show those who are online
//       .get();

//     console.log(`Found ${snapshot.size}x user(s).`);
//     const docs = snapshot.docs;
//     docs.forEach((docSnapshot) => {
//       console.log(docSnapshot.id, docSnapshot.data());
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }
// readAllUsers();
