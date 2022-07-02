import { useState } from "react";
import ErrorMessage from "../../common/error-message";
import LoadingSpinner from "../../common/loading-spinner";
import User from "./user";
import { db } from "../../data/firebase";

function GetOneUser() {
  const [queryState, setQueryState] = useState({
    isLoading: false,
    errorMessage: "",
    docSnapshot: null,
  });
  const [userId, setUserId] = useState("");
  // Should pull out onClick into custom hook so don't have database connection stuff here
  const onClick = async () => {
    try {
      setQueryState({ isLoading: true, errorMessage: "", docSnapshot: null });
      const docSnapshot = await db.collection("Users").doc(userId).get();
      setQueryState({ isLoading: false, errorMessage: "", docSnapshot });
      if (!docSnapshot.exists) {
        console.log(`No user found with id ${userId}`);
      } else {
        console.log("Success! Found the user.");
        console.log(docSnapshot.id);
        console.log(docSnapshot.data());
      }
    } catch (err) {
      setQueryState({
        isLoading: false,
        errorMessage: "Could not connect to database, please try again.",
        docSnapshot: null,
      });
      console.error(err);
    }
  };

  const { isLoading, errorMessage, docSnapshot } = queryState;
  let contents;
  if (isLoading) contents = <LoadingSpinner />;
  else if (errorMessage) contents = <ErrorMessage>{errorMessage}</ErrorMessage>;
  else if (docSnapshot === null)
    contents = <p>Search for a user to see their information.</p>;
  // When haven't made a search
  else if (!docSnapshot.exists) contents = <p>No user found.</p>;
  else contents = <User data={docSnapshot.data()} />; // Data method calls literal that has info from database

  return (
    <div>
      <h3>Get specific user</h3>
      <label>
        User ID:{" "}
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Anonymous arrow function
        />
      </label>
      <button onClick={onClick}>Get user</button>
      {contents}
    </div>
  );
}

export default GetOneUser;

// For ref:
// // How to get a specific user based on their ID using JS (talking to Firebase)
// async function readOneUser(id) {
//   try {
//     const snapshot = await db.collection("Users").doc(id).get();
//     if (!snapshot.exists) {
//       console.log(`No user found with id ${id}`);
//     } else {
//       console.log("Success! Found the user.");
//       console.log(snapshot.id);
//       console.log(snapshot.data());
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// readOneUser("HiBgMVW3h8jj2H7Fv4TK");
