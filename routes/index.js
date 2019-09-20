const express = require('express');
const router = express.Router();

//models
const Recipe = require("../models/recipe");

router.get("/", (req, res) =>{
    Recipe.find({}, (err, foundRecipes) => {
        if(err){
            console.log(err);
        } else{
            res.render("index", {recipes: foundRecipes});
        }
    });
});

router.get("*", (req, res) =>{
    res.send("not found");
});

module.exports = router;