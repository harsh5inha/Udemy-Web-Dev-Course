import React, { useState } from "react";
import ToDoItem from "./ToDoItem"

function App() {
  const [item, setItem] = useState("");   // create state management for the item we type in to the box
  const [list, setList] = useState([])    // create state management for the array of items we are going to display

  function handleChange(event) {          // set "item" variable to whatever is currently typed into the text box
    setItem(event.target.value)
  }

  function addItem() {                    // set "list" array equal to existing items in the array, plus the new item which is stored in the variable called "item"
    setList(prevItems => {
      return[...prevItems, item]          // using the spread operator
    })
    setItem("")                           // then clear the state of the "item" variable so that the text box is empty and ready for the next item
  }

  function deleteItem(id) {               // use the id passed into the function from ToDoItem.jsx (when a TODO item is clicked) to filter the array of items to show only those elements whose id does not match that which was passed in. Effectively, delete the item in question from our array of TODO items.
    setList((prevItems) => {              // This is functional programming at its finest. A function within a function within a funciton etc. Each with inputs and outputs, using arrow functions for brevity, etc.
      return prevItems.filter(
        (ele, index) => {
          return index !== id
        }
      )
    })
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} placeholder="TODO item" value={item} />   {/* Call handleChange whenever we type a new letter into text box */}
        <button onClick={addItem}>                                               {/* When "add" button clicked, call addItem */}
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>                                
         {list.map((ele, index) => (    // for each ele in the array of items, print the ele as an <li>                                
          <ToDoItem 
          key = {index}                 // generally shouldn't use the index as the key, (should use some package like uuid) but doing it here for simplicity
          id = {index}                  // have to separate out a different variable from "key" if we actually want to interact with the index, remember
          text={ele}                    // pass the ele as a variable named "text" to the ToDoItem component
          onChecked = {deleteItem}      // pass the deleteItem function as a variable named onChecked to the ToDoItem component
          />                                             
          ))}                                    
        </ul>
      </div>
    </div>
  );
}

export default App;
