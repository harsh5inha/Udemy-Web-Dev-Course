import React from "react";
import emojipedia from "../emojipedia.js"
import Entry from "./Entry"

function App() {
  return (
    <div>
      <h1> <span>emojipedia</span> </h1>

      <dl className="dictionary">

      {/* Apply arrow function to each of the elements in our emojipedia data using map function. And render them all on screen. */}
      {emojipedia.map(ele =>
        <Entry 
        key = {ele.id}
        emoji = {ele.emoji}  
        name = {ele.name}  
        meaning = {ele.meaning.substring(0, 100) + " ..."}/> )}
      </dl>
    </div>
  ∑)}

export default App;
