import React from "react"

function Detail(props) {
     // receive "detailInfo" data from wherever Detail component is being called (Card.jsx)
    return (<p className="info">{props.detailInfo}</p>)
}
    
export default Detail