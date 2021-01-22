import React, {useState} from "react";

function App() {

  // Set three state variables, one for button hover status, one for submit status, one for full name to display
  const [mouseOver, setMouseOver] = useState(false)
  const [introText, setIntroText] = useState("You have not yet submitted")
  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  })

  // define mouse hover
  function handleMouseOver() {
    setMouseOver(true)
  }

  //  define mouse de-hover
  function handleMouseOut() {
    setMouseOver(false)
  }

  // define "click submit button"
  function handleClick(event) {
    setIntroText("You've Submitted")
    event.preventDefault()                  // Prevent page refresh (which happens by default after form submission)
  }

  // define inputting name functionality
  function handleChange(event) {

    const newValue = event.target.value     // "event" is the event that triggered this change, the target is the element that triggered the change, and the value/name is the value/name field of the element as defined
    const inputName = event.target.name     // have to access the "event" outside the setFullName function, because it's actually a synthetic event created by React (not the browser) for this function. So it's released before we actually try to use it inside the setFullName function. In general, we can't use these events inside of setState functions.
 
    setFullName(prevValue => {              // React comes with the prevValue functionality (the previous state for the object in question)
    return {
      ...prevValue,                         // Using spread operator
      [inputName]: newValue                 // Have to use the [bracket] notation so that it doesn't interpret "inputName" as a string literal
      }      
    })
  }

  return (
    <div className="container">
      <h1>{introText} {fullName.fName} {fullName.lName}</h1>

      {/* When submitted, change the intro text to indicate you've submitted. */}
      <form onSubmit = {handleClick}>

      {/* Update the first and last name values (and states via the handleChange function) as you type into the input boxes */}
      {/* Make sure it's a "controlled component" by specifying a hard-coded "value" so that there's only one, unified source of truth. More on this here: https://reactjs.org/docs/forms.html#controlled-components */}
      <input onChange={handleChange} name="fName" placeholder="First Name" value = {fullName.fName}/>
      <input onChange={handleChange} name="lName" placeholder="Last Name" value = {fullName.lName}/>

      {/* What to do if button is clicked, hovered over, or un-hovered over */}
      <button
        type = "submit"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ backgroundColor: mouseOver ? "black" : "white"}} // Using {{}} notation because it's a JSON format being passed as a JavaScript injection. Using ternary operator.
      >
        Submit
      </button>

      </form>
    </div>
  );
}

export default App;
