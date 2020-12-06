// require mongoose
const mongoose = require("mongoose");

//connect to server & create fruitsDB if it doesn't already exist
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true})

// create schema for fruits
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You didn't specify a name!"]      // only add entry if name is specified
  },
  rating: {
    type: Number,
    min: 1,         // require minimum rating of 1
    max: 10         // require maximum rating of 10
  },
  review: String
})

// create schema for people
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
})

// Name the collection that is going to comply with the particular schema you specify
// Use the singular name (mongoose uses lodash to create the lowercase, plural form when it creates the collection in your database)
const Fruit = mongoose.model("Fruit", fruitSchema)

// Name the collection that is going to comply with the particular schema you specify
// Use the singular name (mongoose creates the lowercase, plural form when it creates the collection via lodash)
// In this case it'd make a collection called 'people'. It's intelligent in that sense.
const Person = mongoose.model("Person", personSchema)

// create a new fruit document
// We're creating a new document (fruit) from our model (Fruit), which means it has to stick to the fruitSchema
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
})


// create a new fruit document
// We're creating a new document (pineapple) from our model (Fruit), which means it has to stick to the fruitSchema
const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit."
})


// create a new person document
// We're creating a new document (person) from our model (Person), which means it has to stick to the personSchema
const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: pineapple
})

// save the apple document inside our 'fruits' collection inside the fruitsDB database
fruit.save()

// also the pineapple document
pineapple.save()

// save John's document inside our 'people' collection inside the fruitsDB database
person.save()







// Example showing how to insert multiple items at once into your database

// // create a new fruit document
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// })
//
// // create a new fruit document
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// })
//
// // create a new fruit document
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// })
//
// // insert all these fruit documents into our fruits collection
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("successfully logged all fruits to fruitsDB!")
//   }
// })






// tap into fruits collection through the Fruit model
// call the find function on it
// if no error via the callback funciton, we get our results back (our results being 'docs')
Fruit.find(function(err, docs) {

  if (err){
    console.log(err)
  } else {


    // return the whole array as an array
    console.log(docs)
    // Tap into the array (javaScrip Object) to return just the name data
    docs.forEach(function(ele){
      console.log(ele.name)

    // // For some reason the below function isn't working. It's saying we can't use a session that has ended. (Discussed in section 27 notes.)
    // // close the connection to the Mongo server
    // mongoose.connection.close()

    });
  }
})



// // Change the name of the document with ID 5fc430ce35f71625a1bc99ba to Peach

// Fruit.updateOne({_id: "5fc430ce35f71625a1bc99ba"}, {name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document.")
//   }
// })




// // Delete the document with a name of Peach

// Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document.")
//   }
// })




// // Delete all documents with the name Apple

// Fruit.deleteMany({name: "Apple"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all documents with the name of Apple")
//   }
// })
