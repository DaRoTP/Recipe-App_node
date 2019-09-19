
const express = require('express');

const router = express.Router();

//show
router.get("/", (req, res) =>{
    res.render("user/show");
});


module.exports = router;