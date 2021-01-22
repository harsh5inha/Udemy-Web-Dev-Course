import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice"

import animals from "./data";

const [cat, dog] = animals;

console.log(animals);
console.log(cat);
console.log(dog);

// CHALLENGE: uncomment the code below and see the car stats rendered

// extract the two JSON objects
const [honda, tesla] = cars

// extract the desired value from the internal JSON objects
const { speedStats: {topSpeed: teslaTopSpeed} } = tesla
const { speedStats: {topSpeed: hondaTopSpeed} } = honda

// extract the desired value from the internal array
const {coloursByPopularity: [teslaTopColour]} = tesla
const {coloursByPopularity: [hondaTopColour]} = honda

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Colour</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
