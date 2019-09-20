var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var RecipeSchema = new mongoose.Schema({
    name: String,
    time: String,
    price: String,
    image: String,
    ingridents: String,
    method: String,
    rating: Number,
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String
     }
});

module.exports = mongoose.model("Recipe", RecipeSchema);