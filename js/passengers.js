$(document).ready(function() {
    var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 70
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg1 = d3.select("#passengers")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "no-hover")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var tooltip1 = svg1.append("g")
        .attr("class", "tooltip1")
        .style("display", "none");
    tooltip1.append("rect")
        .attr("x", -120)
        .attr("width", 280)
        .attr("height", 20)
        .attr("fill", "black")
        .style("opacity", 1);


    tooltip1.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .attr("fill", "white")
        .style("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")

    d3.csv("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/annual_passengers_new.csv").then(function(data) {

        var x = d3.scaleLinear()
            //.domain(d3.extent(data, d => d.year))
            .domain([1990, 2010])
            .range([0, width]);
        var x_axis = d3.axisBottom()
            .scale(x);
        svg1.append("g")
            .attr("class", "x_axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(x_axis);
        //add a x-axis title
        svg1.append("text")
            .attr("x", width)
            .attr("y", height - margin.bottom / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-size", "16px")
            .text("Year");

        var y = d3.scaleLinear()
            //.domain(d3.extent(data, d => d.percentage))
            .domain([0, 110000000])
            .range([height, 2 * margin.top]);
        var y_axis = d3.axisLeft()
            .scale(y);
        svg1.append("g")
            .attr("class", "y_axis")
            //.attr("transform", "translate(10, 0)")
            .call(y_axis);
        //add a y-axis title
        svg1.append("text")
            .attr("x", 0)
            .attr("y", margin.top)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("transform", "translate(22,0)")
            .style("font-size", "16px")
            .text("Number of Passengers");

        svg1.append("line")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", 10)
            .attr("x1", 2001)
            .attr("x2", 2001)
            .attr("y1", height / 2 + 10)
            .attr("y2", height - margin.bottom);

        var colorScale = d3.scaleOrdinal()
            .domain(["WN", "AA", "DL", "UA", "US", "divider"])
            .range(["#eb3d77", "#42aeab", "#5fb9e9", "#fce63f", "#9b5209", "#FF0000"]);

        var drawline = d3.line()
            .x(function(d) {
                return x(d.year);
            })
            .y(function(d) {
                return y(d.count);
            })
            .curve(d3.curveMonotoneX);

        var multiLineData = d3.nest()
            .key(d => d.category)
            .entries(data);

        var lineGroup1 = svg1.append("g")
            .attr("class", "line-group1");

        svg1.select("g.line-group1")
            .selectAll("g")
            .data(multiLineData)
            .enter()
            .append("path")
            .attr("class", function(d) {
                if (d.key == "divider") {
                    return "divider";
                } else {
                    return "multi-lines " + d.key;
                }
            })
            .attr("fill", "none")
            .attr("d", function(d) {
                return drawline(d.values);
            })
            .attr("stroke", function(d) {
                return colorScale(d.key);
            })

            .attr("stroke-width", function(d) {
                if (d.key == "divider") {
                    return "2px";
                } else {
                    return "3px";
                }
            })
            .attr("stroke-dasharray", function(d) {
                if (d.key == "divider") {
                    return ("3, 3");
                }
            })
            .on("mouseover", function() {
                d3.selectAll(".multi-lines").transition()
                    .duration(300)
                    .attr("opacity", 0.25);
                d3.selectAll("."+$(this).attr('class').split(' ')[1]).transition()
                    .duration(200)
                    .attr("opacity", 1);
                tooltip1.style("display", null);
                var firstChild = this.parentNode.parentNode.firstChild;
                if (d3.select(firstChild).attr("class") == "tooltip1") {
                    this.parentNode.parentNode.insertBefore(this.parentNode, firstChild);
                }
            })
            .on("mousemove", function(d) {
                if (d.key != "divider") {
                    const year = Math.floor(x.invert(d3.mouse(this)[0]));
                    const count = Math.floor(y.invert(d3.mouse(this)[1]));
                    var xPosition = parseInt(d3.mouse(this)[0] - 15);
                    var yPosition = parseInt(d3.mouse(this)[1] - 25);
                    tooltip1.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                    tooltip1.select("text").text("Airline: " + d.key + " Year: " + year + " Count: " + count);
                }
            })


            .on("mouseout", function() {
                d3.selectAll(".multi-lines").transition()
                    .duration(300)
                    .attr("opacity", 1);
                tooltip1.style("display", "none");
            });
        //.call(transition);

        var legend_keys = ["WN", "AA", "DL", "UA", "US"];

        var lineLegend = svg1.selectAll(".lineLegend")
            .data(legend_keys)
            .enter().append("g")
            .attr("class", "lineLegend")
            .attr("transform", function(d, i) {
                return "translate(" + width * 0.95 + "," + (i * 20) + ")";
            });

        lineLegend.append("text").text(function(d) {
                return d;
            })
            .attr("fill", "white")
            .attr("transform", "translate(20,10)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", function(d, i) {
                return colorScale(d);
            })
            .attr("width", 10)
            .attr("height", 10)
    });

    svg1.append("text")
        .attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-weight", "bold")
        .attr("x", width / 2 + 40)
        .attr("y", height * 0.2)
        .text("911 Attack");
});
