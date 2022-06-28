import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";

// Document Object Model: elements browser has for elements on page
// root id comes from div in public > index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
