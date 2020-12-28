require('dotenv').config();                                       // require this to store environment variable
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");                    // deprecated level 2. no longer using the encryption key method
// const md5 = require("md5")                                         // deprecated level 2. no longer using the md5 hashing algorithm
// const bcrypt = require("bcrypt")                                   // deprecated level 4. hashing/salting via bcrypt authentication as well
// const saltRounds = 10                                              // deprecated level 4. hashing/salting via bcrypt authentication as well
const session = require("express-session")                            // helps with session logic
const passport = require("passport")                                  // helps with authentication
const passportLocalMongoose = require("passport-local-mongoose")      // helps with local authentication (login and passwords) through mongoose
const GoogleStrategy = require('passport-google-oauth20').Strategy    // OAuth 2.0 through Google
const FacebookStrategy = require('passport-facebook').Strategy;       // OAuth through FACEBOOK
const findOrCreate = require("mongoose-findorcreate")                 // package to help us find or create new users in our DB

const app = express();

app.use(express.static("public"));      // static files in public file
app.set('view engine', 'ejs');          // use EJS
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({                   // initialize sessions (use our express-session module)
  secret: "Our little secret.",     // encryption key used to sign the session IDs
  resave: false,                    // whether we want the session to be resaved to the data store after each request even if the session is left unmodified. If our data store doesn't implement the `touch` method, then we may want this to be true. (Touch basically ensure that the MaxAge of a session is renewed each time it is accessed, even if it went unmodified)
  saveUninitialized: false          // Don't save uninitialized sessions (new sessions) - good for preserving memory, and useful for implementing login based sessions
}))

app.use(passport.initialize());     // initialize passport
app.use(passport.session());        // use passport set up/manage our sessions

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true}) //connect to local DB
mongoose.set("useCreateIndex", true);                                                                   // needed to include this otherwise got a deprecation warning. idk.

//creating a "full" mongoose schema, not just a JS object (we've created something from the actual mongoose.Schema class, thus we can use plugins)
const userSchema = new mongoose.Schema ({
  email: String,
  password: String,   //
  googleId: String,   // Google ID
  fbid: String,       // Facebook ID
  secret: String
})

userSchema.plugin(passportLocalMongoose)                                                      // use our passport-local-mongoose package. This is what salts and hashes the passwords of users who decide to login natively, and stores them into our MongoDB database
userSchema.plugin(findOrCreate)                                                               // enables mongoose-findorcreate package as a plugin to the userSchema for our mongoDB Database
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]})    // DEPRECATED LEVEL 2. use plugin to encrypt user-inputted data. Go to environment variables to find encryption key. Only encrypt password, not email. Will automatically encrypt when we call .save(). It will automatically decrypt when we call .find().

const User = new mongoose.model("User", userSchema)             // create new users collection, where each document will follow the userSchema defined earlier

passport.use(User.createStrategy());                            // create a strategy (local, etc.) using passport-local-mongoose to shorten the amount of code we'd have to write using only passport or passport-local

// passport.serializeUser(User.serializeUser());                // Deprecated bc this is only local authentication. Comes from passport-local-mongoose package, so only local authentication. upon initial log-in, used to determine which data should be stored in the session cookie and sent to the browser
// passport.deserializeUser(User.deserializeUser());            // Deprecated bc this is only local authentication. Comes from passport-local-mongoose package, so only local authentication . used to identify said session/cookie upon each subsequent client request

passport.serializeUser(function(user, done) {       // upon initial log-in, used to determine which data should be stored in the session cookie and sent to the browser
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {       // used to identify said session/cookie upon each subsequent client request
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

passport.use(new GoogleStrategy({                                         // Define the Google Strategy to get user authentication (used upon get requessts to the /auth/google route)
    clientID: process.env.CLIENT_ID,                                      // ID of our web app
    clientSecret: process.env.CLIENT_SECRET,                              // Needed to authenticate us with Google
    callbackURL: "http://localhost:3000/auth/google/secrets",             // Callback URL (where to make a get request after users are authenticated)
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"       // use the oauth userinfo endpoint instead of the default Google Plus (which was deprecated)
  },
  function(accessToken, refreshToken, profile, cb) {                      // access token allows us to access user data via API. Profile is what we're interested it. It has an id value which is the user's Google ID. This is the ID we will use to identify them within our website.
    console.log(profile)                                                  // using this we can print out what Google is sending our way. Nothing too crazy, just name and id really.
    User.findOrCreate({ googleId: profile.id }, function (err, user) {    // find or create user (if DNE) in our users collection - this .findorcreate() function doesn't actually exist natively, but the mongoose-findorcreate package provides the desired functionality
      return cb(err, user);
    });
  }
));

// SIMILAR STRATEGY FOR FACEBOOK AUTHENTICATION
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({fbid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

////////// DEPRECATED LEVEL 4 HASHING/SALTING VIA BCRYPT AUTHENTICATION /////////////

// app.post("/register", function(req, res){
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//     const newUser = new User({
//       email: req.body.username,
//       // password: md5(req.body.password)         // deprecated md5 hashing algorithm
//       password: hash
//     })
//     newUser.save(function(err){
//       if(err){
//         console.log(err)
//       } else {
//         res.render("secrets")
//       }
//     })
// })
// })

////////// DEPRECATED LEVEL 4 HASHING/SALTING VIA BCRYPT AUTHENTICATION /////////////

// app.post("/login", function(req,res){
//   const username = req.body.username;
//   // const password = md5(req.body.password);     // deprecated md5 hashing algorithm code
//   const password = req.body.password;
//   User.findOne({email: username}, function (err, foundUser) {
//     if (err) {
//       console.log(err)
//     } else {
//       if (foundUser) {
//         // if (foundUser.password === password){     //(deprecated level 3. md5 hashing algorithm code) foundUser.password is the password value stored in the DB (the md5 hashed version of the password, in other words)
//         bcrypt.compare(password, foundUser.password).then(function(result) {  // Load bcrypt hash from your DB.
//           if (result === true){
//             res.render("secrets")
//           }
//         })
//         }
//       }
//     }
//   // }                                            // deprecated level 3. md5 hashing algorithm code
//   )
// })

// instructions for get request to root route
app.get("/", function(req, res){
  res.render("home")
})

// instructions for get request to logout route
app.get("/logout", function(req, res){    // Note that this logs a user out of our website, but not from their Google/Facebook account (if they used OAuth to log in). So if, for example, they log out and then try to log back in via google, they won't have to go through re-authentication via google, bc they'll still be logged in on Google.
  req.logout();                           // Passport function. Logs out a user when they click the logout button. This shit really is easy. It handles everything and it's all super clean and simple.
  res.redirect("/");                      // Send home after logout. Cookie data for this session is deleted after logout.
})

// instructions for get request to secrets route
app.get("/secrets", function(req, res){
User.find({"secret": {$ne:null}}, function (err, foundUsers) {      // look through all users in users collection, find all whose "secret" field IS NOT EQUAL TO null
  if (err) {
    console.log(err);
  } else {
    if (foundUsers) {                                               // if found any users
      res.render("secrets", {usersWithSecrets: foundUsers})         // render the secrets page, passing in all the users who meet above condition
    }
  }
})
})

// instructions for get request to auth/google route
app.get("/auth/google",                                   // users make a get request here when they click the "Register/Sign-in with Google" button
  passport.authenticate("google", {scope: ["profile"]})   // This is what actually makes the request to the Google API. It's basically saying: "Use Passport to authenticate our user using the Google strategy, which we defined above. And when we make a request from Google, we tell them that we want the user's profile."
)

// instruction for get request to auth/google/secrets route
app.get("/auth/google/secrets",                                     // get request is made by Google after users are authenticated by Google
  passport.authenticate("google", {failureRedirect: "/login"}),     // So now we can define the user as authenticated locally. If unsuccessful send them to login page
  function(req, res){
    res.redirect("/secrets")                                        // if authenticated, send to secrets page
})

// SIMILAR FUNCTIONALITY FOR FACEBOOK LOGIN AUTHENTICATION
//instructions for get request to auth/Facebook route
app.get('/auth/facebook',
passport.authenticate('facebook'));

// instructions for get request to auth/facebook/secrets route
app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login',
  successRedirect: '/secrets'})
);

// instructions for get request to submit route
app.get("/submit", function(req, res){
  if (req.isAuthenticated()){             // check whether user is authenticated
    res.render("submit")                  // if so, give access to the submit page so they can submit a new secret
  } else {
    res.redirect("/login")                // if not authenticated, have them login
  }
})

// instructions for post request to submit route
app.post("/submit", function(req, res) {
  const submittedSecret = req.body.secret;                // Get secret submitted on the submit form
  console.log(req.user)                                   // can print this to see what Passport is saving for a particular session
  User.findById(req.user.id, function(err, foundUser){    // identify which user is submitting secret by their ID, this is the local ID that we created via Mongo. We need to know this in order to know whom to attribute the secret to in the DB.
    if (err) {
      console.log(err)
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;               // if found a User in DB with matching ID, then set their "secret" field to the one submitted
        foundUser.save(function() {                       // save user with updated secret to DB
          res.redirect("/secrets")                        // redirect to the secrets page (which should now display the new secret)
        })
      }
    }
  })
})

// instructions for get request to register route
app.get("/register", function(req, res){
  res.render("register")
})

// instructions for post request to register route (LOCAL USER REGISTRATION)
app.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){  // registers a new user in our database. Gets username and password inputted into the form on the register page. Passport-local-mongoose handles the salting and hashing for us through the .register() funciton, and those values are stored in DB as well. Using passport-local-mongoose here prevents us from having to create a user, saving them, and interacting with mongoose directly.
    if (err) {
      console.log(err);
      res.redirect("/register")                                                         // if error send back to register page
    } else {
      passport.authenticate("local")(req, res, function(){                              // If successful, authenticate via Passport. Using local (user/pass) method to authenticate. This all happens within Passport-local-mongoose .register() funciton. Idk how exactly it does it.
        res.redirect("/secrets")                                                        // Page only loaded if user successfully authenticated.
      })
    }
  })
})

// instructions for get request to login route
app.get("/login", function(req, res){
  res.render("login")
})

// instructions for post request to login route (LOCAL USER LOGIN)
app.post("/login", function(req,res){
  const user = new User({
    username: req.body.username,                              // get the username inputted in the username box on the login page
    password: req.body.password                               // get the password inputted in the password box on the login page
  })
  req.login(user, function(err){                              // logs user in to website using passport-local-mongoose (if authenticated below)
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){    // authenticate via Passport. Logic defined within passport-local-mongoose .login() funciton. Define user as authenticated if successful.
        res.redirect("/secrets")                              // Page only loaded if successfully authenticated
      })
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
