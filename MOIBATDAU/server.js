//import express
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 4000;  

//middleware
app.use(express.static(path.join(__dirname, 'html')));
 

app.listen(port, () => { console.log("pos-wahsis-web", port) });
