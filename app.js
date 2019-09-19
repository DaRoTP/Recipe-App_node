//package dependencies
const express = require('express');

//models

const app = express();
const PORT = 3000 || env.local.PORT;

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) =>{
    res.render("index");
});

app.get("/recipes", (req, res) =>{
    res.render("recipes/recipes");
});

app.get("/recipes/new", (req, res) =>{
    res.render("recipes/new");
});

app.listen(PORT, () =>{
    console.log("Server started!");
});