// import packages from Facebook
import React from "react";
import ReactDOM from "react-dom";

//Import the add function as default and multiply, subtract and divide as non-default functions from the calculator.js file.
import add, {multiply, subtract, divide} from "./calculator.js"

ReactDOM.render(
  <ul>
    <li>{add(1, 2)}</li>
    <li>{multiply(2, 3)}</li>
    <li>{subtract(7, 2)}</li>
    <li>{divide(5, 2)}</li>
  </ul>,
  document.getElementById("root")
);

