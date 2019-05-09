$(document).ready(function() {


    var scale = $("input[name='scale']:checked").val();
    // alert(radioValue);

    if (scale == "Month") {
        draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/month_SP.csv", scale);
    } else if (scale == "Quarter") {
        draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/quarter_SP.csv", scale);
    } else if (scale == "Year") {
        draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/year_SP.csv", scale);
    }

    $("#scale_btn").click(function() {

        var scale = $("input[name='scale']:checked").val();
        // alert(radioValue);

        if (scale == "Month") {
            draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/month_SP.csv", scale);
        } else if (scale == "Quarter") {
            draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/quarter_SP.csv", scale);
        } else if (scale == "Year") {
            draw_SP_chart("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/year_SP.csv", scale);
        }

    });





})

let draw_SP_chart = function(link, scale) {
    // Size of chart

    $(".SP_chart").remove();
    var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 60
        },
        width = 800 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    // Chart Initialization
    var svg = d3.select("#sd_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "SP_chart");


    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read Data

    d3.csv(link).then(
        function(data) {

            if (scale == "Month") {

                data = get_month_data(data);
                var x = d3.scaleTime()
                    .domain(d3.extent(data, function(d) {
                        return d.Date;
                    }))
                    // .domain([new Date("2001-01"), new Date("2004-12")])
                    .range([0, width]);

                // create X-Axis
                var xAxis = g => g
                    .attr("transform", `translate(0,${height})`)
                    .attr("class", "myXaxis")
                    .call(d3.axisBottom(x))
                    .call(g => g.select(".tick:last-of-type text").clone()
                        .attr("x", -30)
                        .attr("y", -10)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text("Date"));
                // mark of 911
                g.append("line")
                    .attr("stroke", "red")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", 10)
                    .attr("x1", 120)
                    .attr("x2", 120)
                    .attr("y1", 80)
                    .attr("y2", 500);
                g.append("text")
                    .attr("x", 120)
                    .attr("y", 80)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    //         .style("font-family", "sans-serif")
                    .style("fill", "red")
                    //         .style("text-decoration", "underline")
                    .text("911 Attack");

            } else if (scale == "Quarter") {

                data = get_other_data(data);

                var quarter_tickformat = function(quarter, i) {

                    if (quarter.slice(-1) === "1") {
                        return quarter;
                        console.log(quarter);
                    } else {
                        return "";
                        console.log(quarter);
                    }

                };


                var x = d3.scalePoint()
                    .domain(data.map(function(d) {
                        return d.Date;
                    }))
                    .range([0, width]);

                var xAxis = g => g
                    .attr("transform", `translate(0,${height})`)
                    .attr("class", "myXaxis")
                    .call(d3.axisBottom(x)
                        .tickFormat(quarter_tickformat))
                    .call(g => g.select(".tick:last-of-type text").clone()
                        .attr("x", -30)
                        .attr("y", -10)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text("Date"));

                // mark of 911
                g.append("line")
                    .attr("stroke", "red")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", 10)
                    .attr("x1", 410)
                    .attr("x2", 410)
                    .attr("y1", 0)
                    .attr("y2", 500);
                g.append("text")
                    .attr("x", 410)
                    .attr("y", 80)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    //         .style("font-family", "sans-serif")
                    .style("fill", "red")
                    //         .style("text-decoration", "underline")
                    .text("911 Attack");

            } else if (scale == "Year") {

                data = get_other_data(data);

                var x = d3.scalePoint()
                    .domain(data.map(function(d) {
                        return d.Date;
                    }))
                    .range([0, width]);

                var xAxis = g => g
                    .attr("transform", `translate(0,${height})`)
                    .attr("class", "myXaxis")
                    .call(d3.axisBottom(x))
                    .call(g => g.select(".tick:last-of-type text").clone()
                        .attr("x", -30)
                        .attr("y", -10)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text("Date"));

                // mark of 911
                g.append("line")
                    .attr("stroke", "red")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", 10)
                    .attr("x1", 430)
                    .attr("x2", 430)
                    .attr("y1", 0)
                    .attr("y2", 500);
                g.append("text")
                    .attr("x", 430)
                    .attr("y", 80)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    //         .style("font-family", "sans-serif")
                    .style("fill", "red")
                    //         .style("text-decoration", "underline")
                    .text("911 Attack");
            }

            console.log(data);

            // Ordinal axis



            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {
                    return Math.max(d.Passengers, d.Seats);
                })]).nice()
                .range([height, 0]);


            var line_P = d3.line()
                .x(function(d) {
                    return x(d.Date)
                })
                .y(function(d) {
                    return y(d.Passengers)
                });

            var line_S = d3.line()
                .x(function(d) {
                    return x(d.Date)
                })
                .y(function(d) {
                    return y(d.Seats)
                });


            // Creating circle element for each element
            g.selectAll(".Pdots")
                .data(data)
                .enter().append("circle")
                // .attr("transform", `translate(8,0)`)
                .attr("cx", function(d) {
                    return x(d.Date);
                })
                .attr("cy", function(d) {
                    return y(d.Passengers);
                })
                .attr("r", 5)
                .style("fill", "grey")
                .on("mouseover", function(d) {
                    // Changing style of the circle and defining transition
                    d3.select(this).transition().duration(400)
                        .style("fill", "blue")
                        .attr("r", 12)
                        .style("font-size", 24);

                    // Displaying data value above circle
                    g.append("text")
                        .attr("x", function() {
                            return x(d.Date) - 5
                        })
                        .attr("y", function() {
                            return y(d.Passengers) - 30
                        })
                        .text(function() {
                            return d.Passengers
                        })
                        .attr("id", "text_id");

                    // Creating line between circle and axis
                    g.append("line")
                        .attr("x1", function() {
                            return x(d.Date)
                        })
                        .attr("y1", function() {
                            return y(d.Passengers)
                        })
                        .attr("x2", function() {
                            return x(d.Date)
                        })
                        .attr("class", "SP_line_mouseover")
                        .attr("y2", height)
                        .style("stroke-dasharray", "5,5")
                        .style("stroke", "white");
                })

                .on("mouseout", function(d) {
                    // Putting style back to default values
                    d3.select(this)
                        .transition().duration(400)
                        .style("fill", "grey")
                        .attr("r", 5)
                        .style("font-size", 12)

                    // Deleting extra elements
                    d3.select("#text_id").remove();
                    d3.selectAll(".SP_line_mouseover").remove();

                });


            g.selectAll(".Sdots")
                .data(data)
                .enter().append("circle")
                // .attr("transform", `translate(8,0)`)
                .attr("cx", function(d) {
                    return x(d.Date);
                })
                .attr("cy", function(d) {
                    return y(d.Seats);
                })
                .attr("r", 5)
                .style("fill", "grey")
                .on("mouseover", function(d) {
                    // Changing style of the circle and defining transition
                    d3.select(this).transition().duration(400)
                        .style("fill", "red")
                        .attr("r", 12)
                        .style("font-size", 24);

                    // Displaying data value above circle
                    g.append("text")
                        .attr("x", function() {
                            return x(d.Date) - 5
                        })
                        .attr("y", function() {
                            return y(d.Seats) - 30
                        })
                        .text(function() {
                            return d.Seats
                        })
                        .attr("id", "text_id");

                    // Creating line between circle and axis
                    g.append("line")
                        .attr("class", "tooltip_line")
                        .attr("x1", function() {
                            return x(d.Date)
                        })
                        .attr("y1", function() {
                            return y(d.Seats)
                        })
                        .attr("x2", function() {
                            return x(d.Date)
                        })
                        .attr("y2", height)
                        .attr("class", "SP_line_mouseover")
                        .style("stroke-dasharray", "5,5")
                        .style("stroke", "white");
                })

                .on("mouseout", function(d) {
                    // Putting style back to default values
                    d3.select(this)
                        .transition().duration(400)
                        .style("fill", "grey")
                        .attr("r", 5)
                        .style("font-size", 12)

                    // Deleting extra elements
                    d3.select("#text_id").remove();
                    d3.selectAll(".SP_line_mouseover").remove();

                });

            // // Displaying x values
            //  svg.selectAll("text").data(data).enter()
            //   .append("text")
            //    .text(function(d, i) { return d.Date; })
            //    .attr("y", 420)
            //    .attr("x", function(d) { return x(d.Date); })
            //    .style("font-size", 10)
            //    .style("font-family", "monospace");

            // Creating paths
            g.append("path")
                // .attr("transform", `translate(8,0)`)
                .attr("fill", "none")
                .attr("stroke", "darkblue")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .data([data])
                .attr("class", "line")
                .attr("d", line_P);

            g.append("path")
                // .attr("transform", `translate(8,0)`)
                .attr("fill", "none")
                .attr("stroke", "darkred")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .data([data])
                .attr("class", "line")
                .attr("d", line_S);


            // create Y-Axis
            var yAxis = g => g
                .attr("class", "myYaxis")
                // .attr("transform", `translate(${-margin.left},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .text("Count"));

            g.append("g")
                .attr("class", "y_axis")
                .call(yAxis);



            g.append("g")
                .attr("class", "x_axis")
                .call(xAxis);

            var colors = ["darkred", "darkblue"];

            var legend = g.selectAll(".myLegend")
                .data(colors)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(-130," + i * 19 + ")";
                });

            legend.append("circle")
                .attr("cx", width - 18)
                .attr("cy", 3)
                // .attr("width", 18)
                // .attr("height", 18)
                // .style('stroke', function(d, i){ return d.color || colors[i % 10] })
                .attr('r', 5)
                .style("fill", function(d, i) {
                    return colors.slice().reverse()[i];
                });

            legend.append("text")
                .attr("x", width - 10)
                .attr("y", 3)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .style("font-family", "sans-serif")
                .style("font-size", "13px")
                .text(function(d, i) {
                    switch (i) {
                        case 0:
                            return "Passengers";
                        case 1:
                            return "Seats";
                    }
                });

            g.append("text")
                .attr("x", (width / 2))
                .attr("y", 10)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                //         .style("font-family", "sans-serif")
                .style("fill", "white")
                //         .style("text-decoration", "underline")
                .text("No. of Seats & Passengers as Supply and Demand");




        }
    );

};


let get_month_data = function(data) {

    var parseTime = d3.timeParse("%B %Y");
    data.forEach(function(d) {
        d.Date = parseTime(d.Month);
        d.Passengers = +d.Passengers;
        d.Seats = +d.Seats;
    });

    return data;
}


let get_other_data = function(data) {

    data.forEach(function(d) {
        d.Date = d.Date;
        d.Passengers = +d.Passengers;
        d.Seats = +d.Seats;
    });

    return data;
}
