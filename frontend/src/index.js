import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
// import loadData from "./data/initial-data/load-initial-data";
// import { db } from "./data/firebase";
// import { db } from "./data/firebase";

// Document Object Model: elements browser has for elements on page
// root id comes from div in public > index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);

// Use to load new data into Firestore database. Note: overrides anything with same ID. // TO DO:  better way to do this?
// loadData();
