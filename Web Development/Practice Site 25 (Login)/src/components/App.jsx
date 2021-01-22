import React from "react";
import Login from "./Login"
import Register from "./Register"

var isRegistered = true 


function App() {
  return (
  <div className="container"> 
  {    
    // Ternary Operator -> display the login page or register page depending on whether user is registered
    isRegistered === true ? <Login /> : <Register />

    // AND Operator -> achieves the same functionality as `isLoggedIn ? <h1>You're logged in!</h1> : null `
    // isLoggedIn && <h1>You're logged in!</h1>
  }
  </div>
  )
}

export default App;
