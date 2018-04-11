/* DOM MANIPULATION USING D3 */
/* text() */
d3
  .selectAll("div")
  .select("p")
  .text("This is paragraph.");
/* append() */
d3
  .select("body")
  .append("ul")
  .append("li")
  .text("HAHAHAH LI LI LI");
d3
  .selectAll("div")
  .select("p")
  .text("fucking wow shit!");
/* insert() */
d3
  .select("ul")
  .insert("li")
  .text("Second paragraph.");
/* remove() */
d3.select("li").remove();
/* html() */
d3.select("p").html("<span>This was added in HTML</span>");
/* attr(): */
d3
  .selectAll("div#myDiv")
  .append("p")
  .text("vaoday")
  .attr("class", "error");
/* programming d3 */
for (var i = 1; i < 5; i++) {
  d3
    .select("ul")
    .insert("li")
    .text(i + " paragraph.");
}
/* property() */
d3.select("input").property("checked", true);
/* style() */
d3.select("p").style("color", "skyblue");
/* classed()*/
d3.select("p").classed("error", true);
