// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Import Data
d3.csv("assets/data/data.csv")
.then(function(povertySmoking) {

    povertySmoking.forEach(function(data) {
        data.poverty = +data.poverty;
        data.smokes= +data.smokes;
    });
    
 
    var xLinearScale = d3.scaleLinear()
     .domain([8, d3.max(povertySmoking, d => d.poverty)])
     .range([8, width]);

    var yLinearScale = d3.scaleLinear()
     .domain([8, d3.max(povertySmoking, d => d.smokes)])
     .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);

    chartGroup.append("g")
     .call(leftAxis);


    chartGroup.selectAll("circle")
     .data(povertySmoking)
     .enter()
     .append("circle")
     .attr("cx", d => xLinearScale(d.poverty))
     .attr("cy", d => yLinearScale(d.smokes))
     .attr("r", "15")
     .attr("opacity", ".5")
     .attr("fill", "purple");
   
    chartGroup.append("text")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .selectAll("tspan")
      .data(povertySmoking)
      .enter()
      .append("tspan")
          .attr("x", d => xLinearScale(d.poverty))
          .attr("y", d => yLinearScale(d.smokes - 0.2))
          .text(d => d.abbr);

 
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers (% of population)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.75}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty (% of population)");
});