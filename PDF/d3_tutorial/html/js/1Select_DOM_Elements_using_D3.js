/* D3.SELECT(): */
/* Select Element By Name: */
d3.select("p").style("color", "green");
/* Select Element by Id: */
d3.select("#p2").style("color", "blue");

/* D3.SELECTALL(): */
d3.selectAll("#p3").style("color", "red");
d3.selectAll(".myClass").style("color", "pink");


/* SELECT NESTED ELEMENTS: Method Chaining.*/
d3.select("tr").selectAll("td").style('background-color', 'yellow');
/* Method Chaining in D3 */
$("#myDiv").text("WELCOME TO D3").attr("style", "color:red")

d3.select("body").append("p").text("Hello World!");

/* written our D3 code without using chaining */
var bodyElement = d3.select("body");

var div = bodyElement.append("div");
div.append("p").text("Written our D3 code without using chainin");

d3.select("body").append("tr").append("td").text("Meal")


