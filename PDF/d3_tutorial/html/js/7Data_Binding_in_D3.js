/* Data Binding in D3 */
/* data() */

  var myData = ["Hello World!", "Hello D3","Hello JavaScript"];

var p = d3
  .select("body")
  .selectAll("p")
  .data(myData)
  .text(function(d) {
    return d;
  });

var myData = 100;

var p = d3
  .select("body")
  .selectAll("p")
  .data(myData)
  .text(function(d, i) {
    return d;
  });
