// imports
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {

    const [list, setList] = useState([])        // init array to store all notes

    function addNote(ele){                      // when called, adds the input passed into the array of all notes, which is called "list"
        setList(prevNotes => {
            return[...prevNotes, ele]          // using the spread operator
          })
    }

    function deleteNote(id) {                   // when called, returns the array of all notes excluding the note whose id matches that which was passed in
        setList((prevNotes) => {            
          return prevNotes.filter(
            (ele, index) => {
              return index !== id
            }
          )
        })
      }

    return (
      <div>
        <Header />
        <CreateArea
            onAdd = {addNote} />
        {list.map((ele, index) => (    // for each note in the array of notes, print the note on screen (passing the below props to note.jsx to do so)
          <Note 
          key = {index}               
          id = {index}                
          title={ele.title}                 
          content = {ele.content}  
          onDelete = {deleteNote}    
          />))}
        
        <Footer />
      </div>
    );
  }
  
  export default App;