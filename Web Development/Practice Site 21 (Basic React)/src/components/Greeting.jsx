// Need to import React every time we create a new React component
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react"

// create custom component
function Greeting() {

// create custom style JSON block for our dynamic greeting example
const greetingStyle = {
    color: "blue"
}

// init
let greetingMessage;

// create custom greeting based on time of day
if (0 < new Date().getHours() && new Date().getHours() < 12) {
    greetingMessage = "Good Morning"
    greetingStyle.color = "red"
} else if (new Date().getHours() > 18) {
    greetingMessage = "Good Evening"
    greetingStyle.color = "blue"
} else {
    greetingMessage = "Good Afternoon"
    greetingStyle.color = "green"
}

{/* Display custom greeting, using custom greetingStyle and custom greeting message based on time of day */}
return <h3 style = {greetingStyle}> {greetingMessage} </h3>

}

// export it
export default Greeting;