$(document).ready(function(){
    var margin = {top: 20, right: 30, bottom: 100, left: 60},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var svg_airportDivert = d3.select("#airportDivert")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "no-hover")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var tooltip_airportDivert = svg_airportDivert.append("g")
      .attr("class", "tooltip_airportDivert")
      .style("display", "none");

    tooltip_airportDivert.append("rect")
      .attr("x", -35)
      .attr("width", 100)
      .attr("height", 20)
      .attr("fill", "black")
      .style("opacity", 1);

    tooltip_airportDivert.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold");

    d3.csv("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/airports_divert_group_2.csv").then
    (  function (data) {

    //   function tweenDash() {
    //     var l = this.getTotalLength(),
    //         i = d3.interpolateString("0," + l, l + "," + l);
    //     return function (t) { return i(t); };
    //   };

    //   function transition(path) {
    //     d3.selectAll(".multi-lines").each(function(d,i){
    //       d3.select(this).transition()
    //         .attr("stroke-width", "3px")
    //         .delay(i*250)
    //         .duration(2000)
    //         .attrTween("stroke-dasharray", tweenDash);
    //     })
    //   };

    var x = d3.scaleLinear()
      //.domain(d3.extent(data, d => d.year))
      .domain([1990, 2010])
      .range([0, width]);
    var x_axis = d3.axisBottom()
    		.scale(x);
    	svg_airportDivert.append("g")
      .attr("class", "x_axis")
      .attr("stroke", "white")
    		.attr("transform", "translate(0, " + height + ")")
      .call(x_axis);
    //add a x-axis title
    svg_airportDivert.append("text")
          .attr("x", width)
          .attr("y", height-margin.bottom/2)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .style("font-size", "16px")
          .text("Year");

    var y = d3.scaleLinear()
      //.domain(d3.extent(data, d => d.percentage))
      .domain([0, 0.7])
      .range([ height , 2*margin.top]);
    var y_axis = d3.axisLeft()
      .scale(y);
    svg_airportDivert.append("g")
      .attr("class", "y_axis")
      .attr("stroke", "white")
      .call(y_axis);
    //add a y-axis title
    svg_airportDivert.append("text")
          .attr("x", 0)
          .attr("y", margin.top)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .style("font-size", "16px")
          .text("Percentage");

    var colorScale = d3.scaleOrdinal()
      .domain(["large", "medium", "small", "nonhub", "divider"])
      .range(["#eb3d77", "#42aeab", "#5fb9e9", "#fce63f", "#dddddd"]);
      // "#9b5209"

    var drawline = d3.line()
      .x(function(d) {return x(d.year); })
      .y(function(d) {return y(d.percentage); })
      .curve(d3.curveMonotoneX);

    var multiLineData = d3.nest()
      .key(d => d.category)
      .entries(data);

    // var lineGroup = svg_airportDivert.append("g")
    //   .attr("class", "line-group");

    // svg_airportDivert.select("g.line-group")
    //     .selectAll("g")
    svg_airportDivert.append("g").attr("class", "line-group")
        .selectAll("g.line-group")
        .data(multiLineData)
        .enter()
        .append("path")
        .attr("class", function(d) {
          if (d.key == "divider") {
            return "divider";
          }
          else {
            return "multi-lines";
          }
        })
        .attr("fill", "none")
        .attr("d", function(d) {return drawline(d.values); })
        .attr("stroke", function(d) { return colorScale(d.key); })
        .attr("stroke-width", function(d) {
          if (d.key == "divider") {
            return "0.8px";
          }
          else {
            return "3px";
          }
        })
        .attr("stroke-dasharray", function(d) {
           if (d.key == "divider") {
             return ("3, 3");
           }
        })
        .on("mouseover", function(){
            d3.selectAll(".multi-lines").transition()
              .duration(300)
              .attr("opacity", 0.25);
            d3.select(this).transition()
              .duration(300)
              .attr("opacity", 1);
            tooltip_airportDivert.style("display", null);
            var firstChild = this.parentNode.parentNode.firstChild;
            if (d3.select(firstChild).attr("class") == "tooltip_airportDivert") {
              this.parentNode.parentNode.insertBefore(this.parentNode, firstChild);
            }
        })
        .on("mousemove", function(d) {
            const year = Math.floor(x.invert(d3.mouse(this)[0]));
            const percentage = parseFloat(y.invert(d3.mouse(this)[1])).toFixed(2);
            var xPosition = parseInt(d3.mouse(this)[0] - 15);
            var yPosition = parseInt(d3.mouse(this)[1] - 25);
            tooltip_airportDivert.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip_airportDivert.select("text").text(year + " - " + percentage + "%");
        })
        .on("mouseout", function() {
            d3.selectAll(".multi-lines").transition()
              .duration(300)
              .attr("opacity", 1);
            tooltip_airportDivert.style("display", "none");
        });
        //.call(transition);

    var legend_keys = ["large", "medium", "small", "nonhub"];

    var lineLegend = svg_airportDivert.selectAll(".lineLegend")
                        .data(legend_keys)
                        .enter().append("g")
                        .attr("class","lineLegend")
                        .attr("transform", function (d,i) {
                          return "translate(" +width*(i*0.25) + "," + 450+")";
                        });

    lineLegend.append("text").text(function (d) {return d;})
      .attr("transform", "translate(20,10)") //align texts with boxes
      .attr("fill", "white");

    lineLegend.append("rect")
      .attr("fill", function (d, i) {return colorScale(d); })
      .attr("width", 10)
      .attr("height", 10);
    });
});
