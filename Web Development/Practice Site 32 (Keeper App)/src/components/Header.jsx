// Need to import React every time we create a new React component
// otherwise the compiler won't know how to turn the below HTML etc. into browser-readable JavaScript
import React from "react"
import HighlightIcon from "@material-ui/icons/Highlight"

function Header() {
    return(
        <header>
        <h1><HighlightIcon />Keeper</h1>
        </header>
    )
}

export default Header