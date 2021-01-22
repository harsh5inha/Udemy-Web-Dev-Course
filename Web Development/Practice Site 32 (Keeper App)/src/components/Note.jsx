// Need to import React every time we create a new React component
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete"

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => {
        props.onDelete(props.id)        // When DeleteIcon clicked, delete note from our array of notes via the .onDelete prop
        }}
        ><DeleteIcon /></button>
    </div>
  );
}

export default Note;