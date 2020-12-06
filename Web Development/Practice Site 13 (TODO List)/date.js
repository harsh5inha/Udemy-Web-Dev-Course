// creating a module here to be used in app.js line 19 (either method can be used for differing effect)

module.exports.getDate = function(){  // create module with method getDate

  const today = new Date();           // get today's date

  const options = {                   // specify the format you want for the `toLocaleDateString()` function
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  return today.toLocaleDateString("en-US", options); // get the date, but in the format that you want
}


module.exports.getDay = function(){    // create module with method getDate

  const today = new Date();           // get today's date

  const options = {                   // specify the format you want for the `toLocaleDateString()` function
    weekday: "long"
  }
  return today.toLocaleDateString("en-US", options); // get the date, but in the format that you want
}
