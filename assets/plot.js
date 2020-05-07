//theBestFella
//05/06/2020

//[ ]figure out how to read the json
//[ ]read json
//[x]get the right coord
//[x]plot
//[ ]css
//  [x]background
//  [x]line color
//  [x]hoover animation
//  [ ]add real name when point hoover over
//[x]deal with "Hya"
//[ ]rotate with keyboard
//[ ]click sound
//[x]remve cht name
//[ ]remove y axis
//[ ]display double x axis
//[ ]display grid??
//[ ]zoom in
//  [ ]button zoom in
//  [ ]all buttons

//check api
//https://ofrohn.github.io/celestial-demo/viewer.html
//check color
//https://observablehq.com/@mbostock/star-map
//tooltip
//https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
//simple xy
//http://bl.ocks.org/pbogden/7562151/681d8b7fe71fc79c72e6ab206344c09d893a2f60

//point transition
//https://bl.ocks.org/guilhermesimoes/15ed216d14175d8165e6

let zoomAnimation = 2000; //ms

let buttonIn = document.querySelector(".buttonIn");
let buttonOut = document.querySelector(".buttonOut");
buttonIn.addEventListener("click", zoomIn);
buttonOut.addEventListener("click", zoomOut);

function zoomIn(e) {
  let scaleX = d3.scaleLinear().domain([-50, 50]).range([0, width]);
  let scaleY = d3.scaleLinear().domain([-40, 40]).range([height, 0]);

  domXAxis.transition().duration(zoomAnimation).call(d3.axisBottom(scaleX));
  // .duration(this.animationDuration)
  domYAxis.transition().duration(zoomAnimation).call(d3.axisLeft(scaleY));
  // .duration(this.animationDuration)

  dots
    .transition()
    .duration(zoomAnimation)
    .attr("cx", (d) => scaleX(d.x))
    .attr("cy", (d) => scaleY(d.y));
}

function zoomOut(e) {
  //set scale
  let scaleX = d3.scaleLinear().domain([-230, 230]).range([0, width]);
  let scaleY = d3.scaleLinear().domain([-100, 100]).range([height, 0]);

  domXAxis.transition().duration(zoomAnimation).call(d3.axisBottom(scaleX));
  domYAxis.transition().duration(zoomAnimation).call(d3.axisLeft(scaleY));
  // .duration(this.animationDuration)

  dots
    .transition()
    .duration(zoomAnimation)
    .attr("cx", (d) => scaleX(d.x))
    .attr("cy", (d) => scaleY(d.y));
}

// Define the div for the tooltip
var div = d3
  .select(".d3Area")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

let size = 3;

var outerWidth = 360 * size,
  outerHeight = 180 * size; // includes margins

var margin = { top: 30, right: 0, bottom: 50, left: 0 }; // clockwise as in CSS

var width = outerWidth - margin.left - margin.right, // width of plot inside margins
  height = outerHeight - margin.top - margin.bottom; // height   "     "

document.body.style.margin = "0px"; // Eliminate default margin from <body> element

function xValue(d) {
  return d.x;
} // accessors
function yValue(d) {
  return d.y;
}
var line = d3
  .line() // SVG line generator
  .x(function (d) {
    return x(d.x);
  })
  .y(function (d) {
    return y(d.y);
  });

console.log(x);

var svg = d3
  .select(".d3Area")
  .append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight); // Note: ok to leave this without units, implied "px"
d3.select(".d3Area").attr("align", "center");

var g = svg
  .append("g") // <g> element is the inner plot area (i.e., inside the margins)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3
  .scaleLinear() // interpolator for Y axis -- inner plot region
  //.domain(d3.extent(fullDataFlat, yValue))
  .domain([-100, 100])
  .range([height, 0]); // remember, (0,0) is upper left -- this reverses "y"
let vertAxis = d3.axisLeft(y);
let domYAxis = g
  .append("g") // render the Y axis in the inner plot area
  .attr("class", "y axis")
  .call(vertAxis);

var x = d3
  .scaleLinear() // interpolator for X axis -- inner plot region
  //.domain(d3.extent(fullDataFlat, xValue))
  .domain([-230, 230])
  .range([0, width]);
let horiAxis = d3.axisBottom(x);
let domXAxis = g
  .append("g") // render the X axis in the inner plot area
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")") // axis runs along lower part of graph
  .call(horiAxis);

g.append("rect") // plot a rectangle that encloses the inner plot area
  .attr("width", width)
  .attr("width", width)
  .attr("height", height);
// .attr("fill", none);

//all line
fullDataClean.forEach((item) => {
  item.data.forEach((j) => {
    g.append("path") // plot the data as a line
      .datum(j)
      .attr("class", (d, i) => {
        return "line " + item.id;
      })
      .attr("d", line)
      .attr("data-id", item.id)
      .on("mouseover", function (d) {
        console.log(this.dataset.id);
        d3.selectAll("." + this.dataset.id)
          .style("stroke", "salmon")
          .style("stroke-opacity", "0.5");
        div.transition().duration(200).style("opacity", 0.9);
        div
          //.html(d.x + " no " + d.y)
          .html(this.dataset.id + " " + "fullname")
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        d3.selectAll("." + this.dataset.id)
          .transition()
          .style("stroke", "white")
          .style("stroke-opacity", "0.1")
          .duration(700);
        div.transition().duration(0).style("opacity", 0);
      });
  });
});

//all dots
let dots = g
  .selectAll(".dot") // plot a circle at each data location
  .data(fullDataFlat)
  .enter()
  .append("circle")
  .attr("r", (d, i) => (i % 3) + 1)
  .attr("stroke-width", (d, i) => 4 * (i % 3) + 3)
  .attr("class", (d, i) => "dot " + fullDataFlatByID[i])
  .attr("data-id", (d, i) => fullDataFlatByID[i])
  .attr("cx", (d) => x(d.x))
  .attr("cy", (d) => y(d.y))
  .on("mouseover", function (d) {
    //console.log(this.dataset.id);
    d3.selectAll("." + this.dataset.id)
      .style("stroke", "salmon")
      .style("stroke-opacity", "0.5");
    div.transition().duration(200).style("opacity", 0.9);
    div
      //.html(d.x + " no " + d.y)
      .html(this.dataset.id + " " + "fullname")
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY - 28 + "px");
  })
  .on("mouseout", function (d) {
    d3.selectAll("." + this.dataset.id)
      .transition()
      .style("stroke", "white")
      .style("stroke-opacity", "0.1")
      .duration(700);
    div.transition().duration(0).style("opacity", 0);
  });

// d3.selectAll("path")
//   .transition() // data transition
//   .style("stroke", "sienna")
//   .delay(0)
//   .duration(0);

//let fullDataFlat = fullDataClean.flat();

// let coordinates = [
//   [
//     [93.7194, 22.5068],
//     [95.7401, 22.5136],
//     [100.983, 25.1311],
//     [107.7849, 30.2452],
//     [113.6494, 31.8883],
//     [116.329, 28.0262],
//     [113.9806, 26.8957],
//     [110.0307, 21.9823],
//     [106.0272, 20.5703],
//     [99.4279, 16.3993],
//     [101.3224, 12.8956],
//   ],
//   [
//     [110.0307, 21.9823],
//     [109.5232, 16.5404],
//   ],
// ];
// let coord = [];
// coordinates.forEach((element) => {
//   let x = [];
//   element.forEach((inner) => {
//     x.push({ x: -inner[0], y: inner[1] });
//   });
//   coord.push(x);
// });
// let coord_flat = coord.flat();
// var data = [
//   { x: 0, y: 0 },
//   { x: 1, y: 30 },
//   { x: 2, y: 40 },
//   { x: 3, y: 20 },
//   { x: 4, y: 90 },
//   { x: 5, y: 70 },
// ];

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

// g.append("text") // plot title
//   .attr("class", "x label")
//   .attr("text-anchor", "middle")
//   .attr("x", width / 2)
//   .attr("y", -margin.top / 2)
//   .attr("dy", "+.75em")
//   .text("plot title");

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

// .style("filter", "url(#drop-shadow)");

//d3 hoover
//https://bl.ocks.org/d3noob/a22c42db65eb00d4e369

// svg
//   .append("rect") // plot a rectangle that encloses the entire SVG element
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", outerWidth)
//   .attr("height", outerHeight);

// g.on({
//   mouseover: function (d, i) {
//     console.log(this, d, i);
//     d3.select(this).style("cursor", "pointer");
//   },
//   mouseout: function (d) {
//     d3.select(this).style("cursor", "");
//   },
// });
