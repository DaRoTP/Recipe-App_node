const express  = require('express'),
      passport = require('passport');

const router = express.Router();

//models
const Recipe = require("../models/recipe"),
      User   = require("../models/user");

router.get("/", (req, res) =>{
    Recipe.find({}, (err, foundRecipes) => {
        if(err){
            console.log(err);
        } else{
            res.render("index", {recipes: foundRecipes});
        }
    });
});

//AUTH
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
    }
    ),function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, name: req.body.name, email: req.body.email});
    User.register(newUser, req.body.password, function(err, createduser){
        if(err){
            console.log(err);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
    });
});

router.get("*", (req, res) =>{
    res.render("notfound");
});

module.exports = router;