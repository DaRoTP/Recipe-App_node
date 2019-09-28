const mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
    name: String,
    time: String,
    price: String,
    image: String,
    ingredients: String,
    method: String,
    rating: {type: Number, default: 0},
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String
     },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Recipe", RecipeSchema);