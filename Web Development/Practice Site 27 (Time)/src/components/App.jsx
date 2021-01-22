import React, {useState} from "react";

function App() {

  // Define state with variable name "state", update function with variable name "setState" (common naming convention), and set initial state value to current time
  const [state, setState] = useState(new Date().toLocaleTimeString())

  // Create function to set state to whatever new current time is
  function changeTime() {
    setState(new Date().toLocaleTimeString())
  }

  // Dynamically re-run the function to display dynamic time on screen
  setInterval(changeTime, 1000);

  return (
    <div className="container">
      <h2>{state}</h2>
      <button onClick={changeTime}>Get Time</button>
    </div>
  );
}

export default App;
