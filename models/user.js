const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);