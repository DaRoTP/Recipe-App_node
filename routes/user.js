const express   = require('express'),
      passport  = require("passport");

const router = express.Router();
//models
const User = require('../models/user'),
      Recipe = require('../models/recipe');

//show
router.get("/:username", (req, res) =>{
    User.find({username: req.params.username}, (err, foundUser) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            Recipe.find({'author.id': foundUser[0]._id}, (err, foundPosts) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("user/show", {user: foundUser[0], posts: foundPosts} );
                }
            });
            
        }
    });  
});

//update
router.put("/:username", (req, res) => {
    User.findOneAndUpdate({username: req.params.username}, req.body.dbUser, (err, updated) => {
        if(err){
            console.log(err);
            red.redirect("/");
        } else{
            res.redirect("/");
        }
    });
});





module.exports = router;