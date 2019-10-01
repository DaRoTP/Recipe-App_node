const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Recipe = require("../models/recipe"),
      Comment    = require("../models/comment"),
      middleware = require("../middleware");

router.post("/", middleware.isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, foundPost) => {
        if(err){
            console.log(err);
            res.redirect("/recipes");
        } else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Something went wrong...");
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundPost.comments.push(comment);
                    foundPost.save();
                    res.redirect("/recipes/"+foundPost._id);
                }
            });
        }
    }); 
});




router.delete("/:comments_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comments_id, (err, foundcomment) => {
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment deleted");
            res.redirect("/recipes/"+req.params.id);
        }
    });
});





module.exports = router;