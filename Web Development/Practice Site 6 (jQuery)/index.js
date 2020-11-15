$("h1").css("color", "red");

//Change the h1 text by typing
$(document).keypress(function (event) {
  $("h1").text(event.key);
  })

//Allow h1 text to slide up and down
  $("button").on("click", function() {
    $("h1").slideToggle();
  })
