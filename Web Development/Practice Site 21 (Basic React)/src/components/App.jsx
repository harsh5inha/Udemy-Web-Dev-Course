// Need to import React every time we create a new React component
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react"

// importing Heading, List, and Greeting, which are the two other components we've created as examples
import Heading from "./Heading"
import Greeting from "./Greeting"

function App() {
    return(
        <div>
        {/* Render both other components for example's sake */}
            <Heading />
            <Greeting />
        </div>
    )
}

export default App;