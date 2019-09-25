var middlewareObj = {};
var Recipe  = require("../models/recipe");

//check Recipe Ownership
middlewareObj.checkRecipeOwnership = function(req, res, next){
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                req.flash("error", "Post not found");
                res.redirect("back");
            } else{
                if(foundRecipe.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
}
//is Logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "You need to be loged in to do that!");
        res.redirect("/");
    }
}


module.exports = middlewareObj;