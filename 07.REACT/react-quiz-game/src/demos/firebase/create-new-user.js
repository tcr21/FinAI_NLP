import { useState } from "react";
import { db } from "../../data/firebase";

function CreateNewUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Database query in asynchronous handler
  // TO DO: need to add error handling/ useState, say it's loading/ no longer, catch errors and display them etc. (as done in get all users etc.)
  const onClick = async () => {
    try {
      const docRef = await db.collection("Users").add({
        firstName,
        lastName,
        isOnline: true,
        highScore: 0,
        topics: [],
      });
      console.log(`Successfully added new user at ${docRef.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Create User</h3>
      <div>
        <label>
          First name:{" "}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last name:{" "}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={onClick}>Create user</button>
      </div>
    </div>
  );
}

export default CreateNewUser;

// // For ref:
// // JS only version
// async function createUser(user) {
//     try {
//       const docRef = await db.collection("Users").add(user);
//       console.log(`Successfully added new user at ${docRef.id}`);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   // TO DO: she has been added twice (each time I refresh), so need to manage that
//   createUser({
//     firstName: "Pat",
//     lastName: "Mathon",
//     isOnline: false,
//     highScore: 0,
//     topics: ["Formal finance"],
//   });
