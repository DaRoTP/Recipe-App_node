const express = require('express');

const app = express();
const PORT = 3000 || env.local.PORT;

app.get("/", (req, res) =>{
    res.send("test");
});

app.listen(PORT, () =>{
    console.log("Server started!");
});