// Import core functionality
import firebase from "firebase/compat/app"; // Added compat due to updates
// Import firestore functionality specifically
import "firebase/compat/firestore"; // Added compat due to updates

// TO DO: should not be directly in source code, do not want to commit directly to GitHub (any client needs this info to connect but don't want to make it easy for them either)
// Pasted from Config Firebase tab online
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// [RE-INSERT FIREBASE CONFIG HERE TEMPORARILY]

// For future debugging
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: apiKey");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: authDomain");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: projectId");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: storageBucket");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: messagingSenderId");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: appId");
if (!firebaseConfig.apiKey)
  throw new Error("Missing firebase credential: measurementId");

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
