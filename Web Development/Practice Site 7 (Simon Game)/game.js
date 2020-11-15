//init arrays
var gamePattern = []                                     //This the array for the existing pattern that you have to remember
var userClickedPattern = []                              //An array for the buttons you click
var buttonColours = ["red", "blue", "green", "yellow"]

//init vairables
var started = false
var level = 0

//Begin the game with a keypress, but only for the first move of a game. Turn "started" to false thereafter
$(document).keypress(function () {
  if (!started) {
    nextSequence()
    started = true}
})

//get color clicked, add it to the userClickedPattern array, check if it matches with the desired pattern in gamePattern via `checkAnswer`
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour) //add to sequence
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1);
})

//function to check if each click is correct, then checks if length of user inputted sequence is the same as the desired patter.
//If so, then you beat the level, and program proceeds with the `nextSequence()`, which resets the user inputted sequence to an empty array for the next level.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    //Give error screen and flash if incorrect square pressed. Reset the desired sequence array to empty so that the program can create a new sequence.
    } else {
      playSound("wrong")
      console.log("wrong");
      $("body").addClass("game-over")
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart")
      startOver()
    }
}

//Create sequence
function nextSequence() {
  var randomNumber = Math.floor(4*Math.random()); //generate number between 0 and 4
  var randomChosenColour = buttonColours[randomNumber] //select random color
  gamePattern.push(randomChosenColour) //Add color to sequence array
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Animate
  playSound(randomChosenColour) //play sound

  //reset user input sequence for next level, increase level value, print level number to the screen
  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level "+level);
}

//Function to play sound
function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//Function to animate button clicks
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

//Funciton to clear variables for start over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
