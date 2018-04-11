$("#myDiv").text("Some text").attr("style", "color:red")
d3.select("body").append("p").text("Hello World!");
var bodyElement = d3.select("body");

var paragraph = bodyElement.append("p");

paragraph.text("Hello World!");
d3.select("body").append("p").text("Hello World!");
d3.select("body")
  .append("p")
  .text("Third paragraph");