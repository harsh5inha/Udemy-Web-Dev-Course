import React, {useState} from "react";

function App() {
  // useState is a function that returns an array of the state value and a function. We set the initial state to a value of 0
  // We are destructuring the outputted array and storing the state value in a variable named `count` and the function in a variable named `setCount`  (common naming convention)
  const [count, setCount] = useState(0)

  function decrease() {
    setCount(count - 1)
  }
  
  function increase() {
    setCount(count + 1)
  }

  return (
    <div className = "container">
      <h1>{count}</h1>                        {/* Prints out the current state value */}
      <button onClick={decrease}> - </button>
      <button onClick={increase}> + </button>
    </div>
  )
}

export default App;