//jshint esversion:6

// requiring all packages
require('dotenv').config()
const express  = require("express");
const bodyParser = require("body-parser");
const ejs  = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

//const bcrypt = require("bcrypt");
//const saltRounds = 10;
//const md5 = require("md5");
//const encrypt = require('mongoose-encryption');
const app  = express();



// to use staticfiles
app.use(express.static("public"));
//to set ejs
app.set('view engine', 'ejs');
//to use bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//using sessions (express-session{passport.js})
app.use(session({

    secret : "Our little secret.",
    resave: false,
    saveUninitialized: false

}));

//using passport
app.use(passport.initialize());
app.use(passport.session());

 
//connecting mongodb database
mongoose.connect("mongodb://localhost:27017/userDB", {UseNewUrlParser: true});

// creating schema 
const userSchema = new mongoose.Schema ({

    email : String,
    password: String,
    googleId : String,
    secret: String

});

//passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

userSchema.plugin(findOrCreate);

//encrypting
//userSchema.plugin(encrypt,{secret: process.env.SECRET , encryptedFields: ['password']});


//creating model from schema
const User = new mongoose.model("User",userSchema);

//passport-local-mongoose configuration
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//google-auth configuration
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "http://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//get methods

app.get("/",function(req,res){
    res.render("home");
});

//google routes
app.get("/auth/google",function(req,res){

    passport.authenticate("google",{scope: ["profile"]})

});

app.get("/auth/google/secrets", 
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});


app.get("/secrets",function(req,res){

    User.find({"secrets" : {$ne : null}}, function(err,foundUser){
        if(err){
            console.log(err);

        }else{
            if(foundUser){
                res.render("secrets", {usersWithSecrets: foundUser})
            }
        }
    });

});

//submit secret
app.get("/submit",function(req,res){

    if(req.isAuthenticated()){
        res.render("submit");
    } else{
        res.redirect("/login");
    }

});

app.post("/submit",function(req,res){

    const submittedSecret = req.body.secret;
    console.log(req.user.id);

    User.findById(req.user.id,function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                foundUser.secret = submittedSecret;
                foundUser.save(function(){
                        res.redirect("/secrets");
                });
            }
        }

    });
});

//logout
app.get("/logout",function(req,res){

    req.logout();
    res.redirect("/");

});


//Making register functionality working and save user and show secrets page

app.post("/register", function(req,res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });
    
    });

 
// making login functionality working

app.post("/login",function(req,res){

    const user = new User({
        username:  req.body.username,
        password:  req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req,res,function(){
                    res.redirect("secrets");
            });
        }
    });


});




//to listen to port
app.listen(3000,function(req,res){

    console.log("Server started on port 3000");

});

