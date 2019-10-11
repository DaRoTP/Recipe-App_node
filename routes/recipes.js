const express = require('express'),
      mongoose = require('mongoose');
const router = express.Router();
const middleware = require("../middleware");
//models
const Recipe = require("../models/recipe");


router.get("/", (req, res) =>{
    let regex = new RegExp('.');
    if(req.query.search){
        regex = new RegExp(escapeRegExp(req.query.search), 'gi');
    }
        Recipe.find({name: regex}, (err, foundRecipes) => {
            if(err){
                console.log(err);
            } else{
                res.render("recipes/recipes", {recipes: foundRecipes});
            }
        });  
});
//new
router.get("/new", middleware.isLoggedIn,  (req, res) =>{
    res.render("recipes/new");
});
router.post("/", middleware.isLoggedIn, (req, res) => {
    let newRecipe = req.body.recipe;
    var author = {id: req.user._id, username: req.user.username};
    newRecipe.author = author;
    Recipe.create(newRecipe, (err) =>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    });
});

//edit
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(err){
            console.log(err);
        } else{
            res.render("recipes/edit", {recipe: foundRecipe});
        }
    });
});
router.put("/:id", middleware.isLoggedIn, middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if(err){
            console.log(err);
        } else{
            res.redirect("/recipes/"+req.params.id);
        }
    });
});


//show
router.get("/:id", function(req, res){
    let findId = mongoose.Types.ObjectId(req.params.id);
    Recipe.findById(findId)
    .populate("comments")
    .exec(function(err, foundRecipe){
        if(err){
            console.log(err);
        } else{
            if(foundRecipe){
                res.render("recipes/show", { recipe: foundRecipe });
            } else{
                req.flash("error", "Recipe not found");
                res.redirect("/");
            }
        }
    });
});


//delete
router.delete("/:id", middleware.isLoggedIn, middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    });
});

//rating
router.put("/:id/rating", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(err){
            console.log(err);
        } else{
            let tempRating = foundRecipe.rating;
            tempRating = Math.round((tempRating + Number(req.body.stars)) / 2);
            foundRecipe.rating = tempRating;
                        // console.log(req.user);

            foundRecipe.userRatings.push(req.user);
            foundRecipe.save((err) => {
                if(err){
                    console.log(err);
                } else{
                    res.redirect("/recipes/"+req.params.id);
                }
            });
        }
    });
    
});


//escape regex
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

module.exports = router;