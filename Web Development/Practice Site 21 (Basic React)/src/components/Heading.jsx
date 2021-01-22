// Need to import React every time we create a new React component
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react"

// create custom component
function Heading() {
    return <h2>A Component Named "Heading", as an example, followed by a dynamic greeting component named "Greeting":</h2>
}

// export it
export default Heading;