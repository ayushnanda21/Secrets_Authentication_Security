//jshint esversion:6

// requiring all packages
const express  = require("express");
const bodyParser = require("body-parser");
const ejs  = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const app  = express();

// to use staticfiles
app.use(express.static("public"));
//to set ejs
app.set('view engine', 'ejs');
//to use bodyparser
app.use(bodyParser.urlencoded({extended:true}));


//connecting mongodb database
mongoose.connect("mongodb://localhost:27017/userDB", {UseNewUrlParser: true});

// creating schema
const userSchema = new mongoose.Schema ({

    email : String,
    password: String

});

//encrypting
const secret  = "Thisisourlittlesecret.";
userSchema.plugin(encrypt,{secret: secret, encryptedFields: ['password']});


//creating model from schema
const User = new mongoose.model("User",userSchema);


//get methods

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});


//Making register functionality working and save user and show secrets page

app.post("/register", function(req,res){

    const newUser = new User({

        email: req.body.username,
        password: req.body.password

    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Registered User Logged in");
            res.render("secrets");
        }
    }); 


});

 
// making login functionality working

app.post("/login",function(req,res){

    //that  user entered
    const username = req.body.username;
    const password = req.body.password;

    //verifying with db
    User.findOne({email: username},function(err,foundUser){
        if(err){
            console.log(err);
        } else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }
            }
        }

    });



});




//to listen to port
app.listen(3000,function(req,res){

    console.log("Server started on port 3000");

});

