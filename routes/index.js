const express  = require('express'),
      passport = require('passport');

const router = express.Router();

//models
const Recipe = require("../models/recipe"),
      User   = require("../models/user");

router.get("/", (req, res) =>{
    Recipe.find({}, (err, foundRecipes) => {
        if(err){
            req.flash("error", err.message);
        } else{
            res.render("index", {recipes: foundRecipes});
        }
    });
});

//AUTH
router.post("/login", passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "/"
    }
    ),function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "successfuly Loged out");
    res.redirect("/");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, name: req.body.name, email: req.body.email});
    User.register(newUser, req.body.password, function(err, createduser){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Recipee!! "+createduser.username+" !");
            res.redirect("/");
        })
    });
});

router.get("*", (req, res) =>{
    res.render("notfound");
});

module.exports = router;