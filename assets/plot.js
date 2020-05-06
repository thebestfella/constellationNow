//theBestFella
//05/06/2020

//figure out how to read the json

//read json

//get the right coord

//plot

//css

var outerWidth = 900,
  outerHeight = 900; // includes margins

var margin = { top: 100, right: 20, bottom: 80, left: 80 }; // clockwise as in CSS

var width = outerWidth - margin.left - margin.right, // width of plot inside margins
  height = outerHeight - margin.top - margin.bottom; // height   "     "

document.body.style.margin = "0px"; // Eliminate default margin from <body> element

// console.log(fullData);
// coordinates.forEach((element) => {
//   let x = [];
//   element.forEach((inner) => {
//     x.push({ x: -inner[0], y: inner[1] });
//   });
//   coord.push(x);
// });

var coordinates = [
  [
    [93.7194, 22.5068],
    [95.7401, 22.5136],
    [100.983, 25.1311],
    [107.7849, 30.2452],
    [113.6494, 31.8883],
    [116.329, 28.0262],
    [113.9806, 26.8957],
    [110.0307, 21.9823],
    [106.0272, 20.5703],
    [99.4279, 16.3993],
    [101.3224, 12.8956],
  ],
  [
    [110.0307, 21.9823],
    [109.5232, 16.5404],
  ],
];

let coord = [];

coordinates.forEach((element) => {
  let x = [];
  element.forEach((inner) => {
    x.push({ x: -inner[0], y: inner[1] });
  });
  coord.push(x);
});

let coord_flat = coord.flat();

var data = [
  { x: 0, y: 0 },
  { x: 1, y: 30 },
  { x: 2, y: 40 },
  { x: 3, y: 20 },
  { x: 4, y: 90 },
  { x: 5, y: 70 },
];

function xValue(d) {
  return d.x;
} // accessors
function yValue(d) {
  return d.y;
}

var x = d3.scale
  .linear() // interpolator for X axis -- inner plot region
  .domain(d3.extent(coord_flat, xValue))
  .range([0, width]);

var y = d3.scale
  .linear() // interpolator for Y axis -- inner plot region
  .domain(d3.extent(coord_flat, yValue))
  .range([height, 0]); // remember, (0,0) is upper left -- this reverses "y"

var line = d3.svg
  .line() // SVG line generator
  .x(function (d) {
    return x(d.x);
  })
  .y(function (d) {
    return y(d.y);
  });

var xAxis = d3.svg
  .axis() // x Axis
  .scale(x)
  //.ticks(5) // request 5 ticks on the x axis
  .orient("bottom");

var yAxis = d3.svg
  .axis() // y Axis
  .scale(y)
  // .ticks(4)
  .orient("left");

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight); // Note: ok to leave this without units, implied "px"

var g = svg
  .append("g") // <g> element is the inner plot area (i.e., inside the margins)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

g.append("g") // render the Y axis in the inner plot area
  .attr("class", "y axis")
  .call(yAxis);

g.append("g") // render the X axis in the inner plot area
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")") // axis runs along lower part of graph
  .call(xAxis);

// g.append("text") // inner x-axis label
//   .attr("class", "x label")
//   .attr("text-anchor", "end")
//   .attr("x", width - 6)
//   .attr("y", height - 6)
//   .text("inner x-axis label");

// g.append("text") // outer x-axis label
//   .attr("class", "x label")
//   .attr("text-anchor", "end")
//   .attr("x", width / 2)
//   .attr("y", height + (2 * margin.bottom) / 3 + 6)
//   .text("outer x-axis label");

g.append("text") // plot title
  .attr("class", "x label")
  .attr("text-anchor", "middle")
  .attr("x", width / 2)
  .attr("y", -margin.top / 2)
  .attr("dy", "+.75em")
  .text("plot title");

// g.append("text") // inner y-axis label
//   .attr("class", "y label")
//   .attr("text-anchor", "end")
//   .attr("x", -6)
//   .attr("y", 6)
//   .attr("dy", ".75em")
//   .attr("transform", "rotate(-90)")
//   .text("inner y-axis label");

// g.append("text") // outer y-axis label
//   .attr("class", "x label")
//   .attr("text-anchor", "middle")
//   .attr("x", -height / 2)
//   .attr("y", -6 - margin.left / 3)
//   .attr("dy", "-.75em")
//   .attr("transform", "rotate(-90)")
//   .text("outer y-axis label");

coord.forEach((element) => {
  g.append("path") // plot the data as a line
    .datum(element)
    .attr("class", "line")
    .attr("d", line);
});

g.append("rect") // plot a rectangle that encloses the inner plot area
  .attr("width", width)
  .attr("width", width)
  .attr("height", height);

// svg
//   .append("circle") // plot a circle in the upper left of the SVG element
//   .attr("cx", 0)
//   .attr("cy", 0)
//   .attr("r", 10);

// svg
//   .append("circle") // plot a circle in the lower right of the SVG element
//   .attr("cx", outerWidth)
//   .attr("cy", outerHeight)
//   .attr("r", 10);

g.selectAll(".dot") // plot a circle at each data location
  .data(coord_flat)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", function (d) {
    return x(d.x);
  })
  .attr("cy", function (d) {
    return y(d.y);
  })
  .attr("r", 5);

// svg
//   .append("rect") // plot a rectangle that encloses the entire SVG element
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", outerWidth)
//   .attr("height", outerHeight);

d3.selectAll("path")
  .transition() // data transition
  .style("stroke", "steelblue")
  .delay(000)
  .duration(000);
