import { useState } from "react";
import { db } from "../../data/firebase";

function UpdateUser() {
  const [userId, setUserId] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const onClick = async () => {
    try {
      await db.collection("Users").doc(userId).update({
        // Don't need isOnline: isOnline because variable is same name
        isOnline,
      });
      console.log(`Successfully updated user ${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Update User</h3>
      <label>
        User ID:{" "}
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label>
        Is online?{" "}
        <input
          type="checkbox"
          checked={isOnline}
          onChange={(e) => setIsOnline(e.target.checked)}
        />
      </label>
      <button onClick={onClick}>Update user</button>
    </div>
  );
}

export default UpdateUser;

// For ref:
// JS only version
// async function updateUser(userId) {
//     try {
//       await db.collection("Users").doc(userId).update({
//         isOnline: false,
//       });
//       console.log(`Successfully updated user ${userId}`);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   updateUser("rdkiwA2faGh3z1SBmZdC");
