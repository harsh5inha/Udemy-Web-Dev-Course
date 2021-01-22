// Need to import React every time we create a new React component,
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react"

// create custom component
function List() {
    return <div>
    <li>Mango</li> 
    <li>Cherry</li> 
    <li>Watermelon</li> 
    </div>
}

// export it
export default List;