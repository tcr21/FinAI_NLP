import { useState } from "react";
import { db } from "../../data/firebase";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const onClick = async () => {
    try {
      await db.collection("Users").doc(userId).delete();
      console.log(`Successfully deleted user ${userId}`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h3>Delete user</h3>
      <label>
        User ID:{" "}
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Anonymous arrow function
        />
      </label>
      <button onClick={onClick}>Delete user</button>
    </div>
  );
}

export default DeleteUser;

// For ref:
// async function deleteUser(userId) {
//     try {
//       await db.collection("Users").doc(userId).delete();
//       console.log(`Successfully deleted user ${userId}`);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   deleteUser("kjcoejqc"); // Note: delete operation says it worked even when key / collection doesn't exist
