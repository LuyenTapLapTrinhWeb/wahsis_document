/* ANIMATION IN D3 */

/* transition() */

var t = d3.transition().duration(5000); /* variable transition */

d3.select("div").on("mouseover", function() {
  d3
    .select("#container")
    .transition(t)
    .style("background-color", "red");
});

/* transition.ease */
var easing = [
  "easeElastic",
  "easeBounce",
  "easeLinear",
  "easeSin",
  "easeQuad",
  "easeCubic",
  "easePoly",
  "easeCircle",
  "easeExp",
  "easeBack"
];

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", 960)
  .attr("height", 500);

function circleTransition(easement, yPos) {
  var timeCircle = svg
    .append("circle")
    .attr("fill", "steelblue")
    .attr("r", 20);
  repeat();

  function repeat() {
    timeCircle
      .attr("cx", 210) // position the circle at 40 on the x axis
      .attr("cy", yPos * 45 + 25) // position the circle at 250 on the y axis
      .transition() // apply a transition
      .ease(easement) // control the speed of the transition
      .duration(4000) // apply it over 2000 milliseconds
      .attr("cx", 720) // move the circle to 920 on the x axis
      .transition() // apply a transition
      .ease(easement) // control the speed of the transition
      .duration(4000) // apply it over 2000 milliseconds
      .attr("cx", 210) // return the circle to 40 on the x axis
      .on("end", repeat); // when the transition finishes start again
  }

  var easeType = svg
    .append("text")
    .attr("dy", ".35em") // set offset y position
    .attr("x", 475)
    .attr("text-anchor", "middle") // set anchor x justification
    .attr("y", yPos * 45 + 25)
    .text(easing[yPos]);
}

circleTransition(d3.easeElastic, 0);
circleTransition(d3.easeBounce, 1);
circleTransition(d3.easeLinear, 2);
circleTransition(d3.easeSin, 3);
circleTransition(d3.easeQuad, 4);
circleTransition(d3.easeCubic, 5);
circleTransition(d3.easePoly, 6);
circleTransition(d3.easeCircle, 7);
circleTransition(d3.easeExp, 8);
circleTransition(d3.easeBack, 9);

/* Delay() */
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

var bar1 = svg
  .append("rect")
  .attr("fill", "blue")
  .attr("x", 100)
  .attr("y", 20)
  .attr("height", 20)
  .attr("width", 10);

var bar2 = svg
  .append("rect")
  .attr("fill", "blue")
  .attr("x", 120)
  .attr("y", 20)
  .attr("height", 20)
  .attr("width", 10);

update();

function update() {
  bar1
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("height", 1000);

  bar2
    .transition()
    .ease(d3.easeLinear)
    .duration(20000)
    .delay(2000)
    .attr("height", 1009);
}
