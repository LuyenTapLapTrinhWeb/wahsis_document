var mymiddlewarefunction = require("./my-middleware.js");
var express = require("express");
var app = express();

var requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(mymiddlewarefunction({ option1: "1", option2: "2" }));

app.use(requestTime);

app.get("/", function(req, res) {
  var responseText = "Hello World!<br>";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  //   res.send(responseText);

  responseText += `Option {option1: ${req.option1}, option2: ${req.option2}, option3:${req.option3}}`;
  res.send(responseText);
});

app.listen(3000);
