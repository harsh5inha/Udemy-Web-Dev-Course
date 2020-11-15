//Add Event Listener for every button clicked
for (i = 0; i < document.querySelectorAll(".drum").length; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {

    //make sound
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);

    //change colours for fun
    this.style.color = "white";

    //print events to console
    console.log(event);

    //adds animation to buttons
    buttonAnimation(buttonInnerHTML);
  });
}

//Add eventListener for keys pressed
document.addEventListener("keydown", function(event) {
  makeSound(event.key);

  //Print keystrokes to the console
  console.log(event);

  //adds animation to buttons
  buttonAnimation(event.key);
});


//Define function
function makeSound(key) {

  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default: console.log(buttonInnerHTML);
    }
}


//create slight button click animation
function buttonAnimation(currentKey) {

  //using "." + because "currentKey" is a class and thus needs a period first to be selected
  var activeButton = document.querySelector("." + currentKey);

  //check CSS for the specification of "pressed" class.
  activeButton.classList.add("pressed");

  //wait .1 seconds and then remove the class you just placed on the object. Voila.
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);

}
