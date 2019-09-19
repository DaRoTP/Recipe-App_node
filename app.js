//package dependencies
const express    = require('express'),
      bodyParser = require('body-parser');

//routes
const indexRoutes   = require('./routes/index.js'),
      userRoutes    = require('./routes/user.js'),
      recipesRoutes = require('./routes/recipes.js');

const app = express();
const PORT = 3000 || env.local.PORT;

//setting default view engine to .ejs
app.set("view engine", "ejs");
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//creates a static public directory
app.use(express.static(__dirname+"/public"));

//Use Routes
app.use("/user", userRoutes);
app.use("/recipes",recipesRoutes);
app.use(indexRoutes);



app.listen(PORT, () =>{
    console.log("Server started!");
});