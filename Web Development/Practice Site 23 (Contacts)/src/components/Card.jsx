import React from "react";
import Avatar from "./Avatar"
import Detail from "./Detail"

// styling drawn from styles.css
// passing "props" as input to interact with the Properties for this component (defined in App.jsx)
function Card(props) {
    return (
    <div className="card">
    <div className="top">
    <p>{props.key2}</p>                         {/* Printing out the id of each component for example's sake. (Have to use `key2` or some other name because `key` is not a normal prop) */}
    <h2 className="name">{props.name}</h2>      {/* print out the "name" data of these components (passed from App.jsx) */}
    <Avatar imgURL={props.img} />               {/* use Avatar component to display image */}
    </div>
    <div className="bottom">
    <Detail detailInfo = {props.phone}/>        {/* use Detail component to display phone number */}
    <Detail detailInfo = {props.email}/>        {/* use Detail component to display email */}
    </div>
    </div>
    )
}

export default Card;