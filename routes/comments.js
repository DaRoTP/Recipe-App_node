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
                    req.flash("success", "Successfuly added a comment");
                    res.redirect("/recipes/"+foundPost._id);
                }
            });
        }
    }); 
});



// router.get("/:comments_id/edit", middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comments_id, function(err, foundcomment){
//         if(err){
//             res.redirect("back");
//         } else{
//             res.render("comments/edit", {campground_id: req.params.id, comment: foundcomment});
//         }
//     });
// });

// router.put("/:comments_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, foundcomment){
//         if(err){
//             res.redirect("back");
//         } else{
//             res.redirect("/campgrounds/"+req.params.id);
//         }
//     });
// });

// router.delete("/:comments_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndRemove(req.params.comments_id, function(err, foundcomment){
//         if(err){
//             res.redirect("back");
//         } else{
//             req.flash("success", "Comment deleted");
//             res.redirect("/campgrounds/"+req.params.id);
//         }
//     });
// });






module.exports = router;