import React from "react"

function Avatar(props) {

    // receive "imgURL" data from wherever Avatar component is being called (App.jsx and Card.jsx)
    return (<img className="circle-img" src={props.imgURL} alt="avatar_img"/>)
}
    
export default Avatar