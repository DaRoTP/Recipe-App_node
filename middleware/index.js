var middlewareObj = {};
const Recipe    = require("../models/recipe"),
      Comment   = require("../models/comment");

//check Recipe Ownership
middlewareObj.checkRecipeOwnership = (req, res, next) => {
        Recipe.findById(req.params.id, (err, foundRecipe) => {
            if(err){
                req.flash("error", "Post not found");
                res.redirect("back");
            } else{
                if(foundRecipe.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
}

//check comment ownership
middlewareObj.checkCommentOwnership = (req, res, next) => {
    Comment.findById(req.params.comments_id, (err, foundComment) => {
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Comment does not exist!');
           res.redirect('/recipes');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/recipes/' + req.params.id);
       }
    });
  }

//is Logged in
middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "You need to be loged in to do that!");
        res.redirect("/");
    }
}




module.exports = middlewareObj;