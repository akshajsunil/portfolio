const express = require('express');
const app = express();
app.use("/static", express.static('./static/'));
var path = require('path');
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./views/home.html'));
});





app.listen(5000,console.log("running in 5000"));