const express = require('express');
const router = express.Router();

//models
const Recipe = require("../models/recipe");


router.get("/", (req, res) =>{
    Recipe.find({}, (err, foundRecipes) => {
        if(err){
            console.log(err);
        } else{
            res.render("recipes/recipes", {recipes: foundRecipes});
        }
    });
    
});
//new
router.get("/new", (req, res) =>{
    res.render("recipes/new");
});
router.post("/", (req, res) => {
    let newRecipe = req.body.recipe;
    Recipe.create(newRecipe, (err) =>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    });
});


//show
router.get("/:id", (req, res) =>{
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(err){
            console.log(err);
        } else{
            res.render("recipes/show", { recipe: foundRecipe });
        }
    });
});

module.exports = router;