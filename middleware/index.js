var middlewareObj = {};
var Recipe  = require("../models/recipe");

//check Recipe Ownership
middlewareObj.checkRecipeOwnership = function(req, res, next){
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err){
                res.redirect("back");
            } else{
                if(foundRecipe.author.id.equals(req.user._id)){
                    next();
                }else{
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
        res.redirect("/");
    }
}


module.exports = middlewareObj;