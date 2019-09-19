const express = require('express');

const router = express.Router();


router.get("/", (req, res) =>{
    res.render("recipes/recipes");
});
//new
router.get("/new", (req, res) =>{
    res.render("recipes/new");
});
//show
router.get("/ddd", (req, res) =>{
    res.render("recipes/show");
});

module.exports = router;