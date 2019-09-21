const express   = require('express'),
      passport  = require("passport");

const router = express.Router();
//models
User = require('../models/user');

//show
router.get("/", (req, res) =>{
    res.render("user/show");
});


module.exports = router;