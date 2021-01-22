# Angela Yu's Full Stack Web Dev Bootcamp

## This is a collection of files that were compiled while taking Angela Yu's Udemy Course on Full Stack Web Development. Practice Sites 12 and 17 are nested Git repos, because they were deployed via Heroku, which requires git logic for deployment. So they cannot be accessed via the master folder. They're included as independent repos on Github.  


## File Structure:
- Resources is a file with a bunch of cheatsheets and vizualizations that can be helpful/
- "Web Development" is the primary folder
- Within Notes, we see a text file for each section of the course.
- We have 32 practice websites. 
    - Sites 0-3 are vanilla HTML, CSS, JS.
    - Sites 4-7 are Node sites
    - Sites 8-20 are server based Node sites
    - Sites 21-32 are React sites

Sites 0-3 are self-explanatory in terms of starting. Just click on the html file. For 4-32 you'll have to go through the notes to the specific sites if you need a refresher on how to spin one up. It ranges from doing `node server_name` for server based Node apps to spinning up a React site via `npm start`. The deets are all in the Notes. Also note that there is no back-end functionality in any of our React apps. It's the same concept as all the earlier server based Node apps if you want to add it in though.

Below links the Practice Sites with where you can find the sites' creation process in the notes directory.

### Mapping
- Site 0 (Sherlock)                 -   Section 2         This is a cheatsheet type HTML/CSS template.
- Site 1 (Personal- Basic)          -   Section 4         This is a basic personal website.
- Site 2 (Personal)                 -   Section 5         Another basic personal website, but it's a complete draft.
- Site 3 (Tindog)                   -   Section 6         This a dog dating site. Useful for understanding dynamic spacing, grids, and placement on sites.   
- Site 4 (Dice)                     -   Section 12        This is a site that randomly shuffles dice and displays a dynamic message.
- Site 5 (Drum Kit)                 -   Section 13        This is a site that displays how to fire off certain sounds and formatting based on key clicks/mouse clicks via JS.
- Site 6 (jQuery)                   -   Section 14        This shows a bit of jQuery.
- Site 7 (Simon Game)               -   Section 15        This is a game based on clicking a pattern of colors, each iteration the pattern becoming one click longer.
- Site 8 (Node.js)                  -   Section 18        This isn't a real website, it just prints out the name of a superhero and a supervillain.
- Site 9 (Server.js)                -   Section 18        Also not a real site, just basic template for GET requests.
- Site 10 (Calculator)              -   Section 19        This is a server based app that calculates your BMI given your height and weigtht.
- Site 11 (Weather API)             -   Section 20        This deals with APIs, getting weather data from openWeatherMap and storing Environment variables in a separate folder.
- Site 12 (Newsletter)              -   Section 20        This is a site that allows people to sign up for a newletter that I would manage via MailChimp. (Interacting via an API.) (This is stored as a separte Github repo.)
- Site 13 (TODO List)               -   Section 22        This is a basic TODO list (without persistant storage of TODO items)
- Site 14 (Blog)                    -   Section 23        This is a basic blog (without persistent storage of entries)
- Site 15 (FruitsDB)                -   Section 26        This is the first site that connects to MongoDB. It inserts 3 documents into a collection.
- Site 16 (FruitsDB via Mongoose)   -   Section 27        Similar to above, except using Mongoose to make things easier.
- Site 17 (TODO List Part 2)        -   Section 28        This is an upgrade of Site 13. Here we are storing the TODO items into Mongo ATlas so they are persistent and on the cloud. (This site is stored as a separte repo on Github.)
- Site 18 (Blog Part 2)             -   Section 30        This is an upgraded Site 14. Blog entries are stored and retrieved via Mongo Atlas (cloud), opposed to dissapearing upon refresh. (Persistent data.)
- Site 19 (Wiki API)                -   Section 31        This site walks us through route handlers and using the Robo 3T GUI to interact with data. It's a type of Wiki API.
- Site 20 (Secrets)                 -   Section 32        This is a heavy site where users can register or log-in to see secrets that they and others have posted to one common page. It walks us through using encryption and Google/Facebook OAuth to authorize users and allow them on to a website. We use Mongo to make the data storage persistent.
- Site 21 (Basic React)             -   Section 33        Basic site that demonstrates how to init a React site.
- Site 22 (React Calculator)        -   Section 33        Example of how to link together React files to export/import functionality accross files. Basic calculator.
- Site 23 (Contacts)                -   Section 33        Basic introduction to using JSX components to make a REact site. Just displays a few contacts cards (inputted famous people for example's sake)
- Site 24 (Emojipedia)              -   Section 33        More of the same, a site with cards, each with a different emoji with description.
- Site 25 (Login)                   -   Section 33        A simple login flow site. It doesn't actually have the register functionality, it's just meant as an example of a Ternary operator in use to render different states of the UI.
- Site 26 (React Hooks)             -   Section 33        A ticker and two buttons. One to increase the count and one to decrease the count. Supposed to demonstrate how to set up and use the React.useState() function. And how to update the state and UI accordingly through the setCount() functionality.
- Site 27 (Time)                    -   Section 33        A self-updating timer that gives the new time every second. Demonstrates again how to use the React.useState hook functionality
- Site 28 (Destructuring)           -   Section 33        Shows how we can destructure data from JSON datasets to display it in our apps. Should be a useful format to follow for interacting with API received data.
- Site 29 (Event Handling)          -   Section 33        Meant mainly just to demonstrate how EventListeners/event handling works in React. Events are fired when the mouse hovers over the button, dehovers from it, when input is put into the text boxes, and when the button is clicked.
- Site 30 (Spread Operator)         -   Section 33        Same as above, just simplified using the spread operator.
- Site 31 (TODO List Part 3)        -   Section 33        A pretty end-to-end functional React site that makes use of State. Another todo list. Heavy use of functional programming, defining and manipulating state, props, hooks, eventHandlers, mapping, child components, plus now we're also using component trees (passing state from child to parent components, etc.)
- Site 32 (Keeper App)              -   Section 33        A mimic of the Google Keep app. Pretty end to end. We incorporate some icons, conditional rendering, and animations. Important to understand the flow of data between components, props, functions, state, and hooks etc. (No back-end functionality, like all the rest of the React Apps.)
