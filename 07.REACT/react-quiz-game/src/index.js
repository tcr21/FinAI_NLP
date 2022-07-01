import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { db } from "./data/firebase";

// Document Object Model: elements browser has for elements on page
// root id comes from div in public > index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);

async function readAllUsers() {
  try {
    // Long way
    // const collectionRef = db.collection("Users");
    // const getPromise = collectionRef.get();
    // const snapshot = await getPromise;

    // Short way:
    const snapshot = await db
      .collection("Users")
      .where("isOnline", "==", true) // allows us to filter to only show those who are online
      .get();

    console.log(`Found ${snapshot.size}x user(s).`);
    const docs = snapshot.docs;
    docs.forEach((docSnapshot) => {
      console.log(docSnapshot.id, docSnapshot.data());
    });
  } catch (err) {
    console.error(err);
  }
}
readAllUsers();
