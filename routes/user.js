const express   = require('express'),
      passport  = require("passport");

const router = express.Router();
//models
User = require('../models/user');

//show
router.get("/:username", (req, res) =>{
    User.find({username: req.params.username}, (err, foundUser) => {
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            res.render("user/show", {user: foundUser[0]});
        }
    });
    
});




module.exports = router;