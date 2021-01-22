import React from "react"

function ToDoItem(props) {
    return (
        <div onClick={() => {
            props.onChecked(props.id)           // run OnChecked function (and pass in the id), but only when clicked on
            }}>
        <li>{props.text}</li>                   {/* display list item */}
        </div>
    )
}

export default ToDoItem
