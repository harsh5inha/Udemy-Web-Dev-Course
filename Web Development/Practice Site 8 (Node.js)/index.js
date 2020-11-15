//include the native filesystem module
const fs = require("fs")

//copy the contents from file1 into a new file or overwrite an existing file called file2.txt
fs.copyFileSync("file1.txt", "file2.txt");

//create random superhero name using external superheroes package
var superheroes = require("superheroes");
var mySuperheroName = superheroes.random()
console.log(mySuperheroName); //log it to console


//create random supervillain name using external supervillains package
var supervillains = require("supervillains");
var mySupervillainName = supervillains.random()
console.log(mySupervillainName); //log it to console
