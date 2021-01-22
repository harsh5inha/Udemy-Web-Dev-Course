import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import Zoom from "@material-ui/core/Zoom"

function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false)

    const [note, setNote] = useState({
        title: "",
        content: "" 
    })

    function handleChange(event){                   // This enables us to actually type into our text boxes, and have React remember the letters we type
        const {name, value} = event.target          // using destructuring to extract the name and value from event.target

        setNote(prevData => {                       // This updates either the "title" section or the "content" section of the current note being edited (depending on which text box is being typed into)
            return {
              ...prevData,                     
              [name]: value             
              }      
            })
    }

    function submitNote(event) {                    // passes the note we've typed out to App.jsx, and adds it to our array of ntoes via the .onAdd prop. Then clears our input field so we can start typing a new note.
        event.preventDefault()                      // prevent the default refresh after form submission (otherwise we'd start with an empty page every time we tried to add a new note)
        props.onAdd(note)
        setNote({
            title:"",
            content:""
        })
    }

    function expand(){
        setExpanded(true)
    }

  return (
    <div>
      <form className="create-note">
      {isExpanded ? <input onChange={handleChange} name="title" placeholder="Title" value = {note.title} /> : null}    {/* If expanded, then show the title text box, if not then don't (ternary operator) */}
        <textarea onChange={handleChange} onClick= {expand} name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value ={note.content}/> {/* If expanded, then show the expanded content text box, if not then don't (ternary operator) */}
        <Zoom in={isExpanded ? true : false}> 
        <Fab onClick={submitNote} >
        <AddIcon /> 
        </Fab> 
        </Zoom> {/* If expanded, then perform the zoom animation on the AddIcon button, if not then don't (ternary operator). Use Fab for the flash animation when hovering over. When clicked, call submitNote function. */}
      </form>
    </div>
  );
}




export default CreateArea;
