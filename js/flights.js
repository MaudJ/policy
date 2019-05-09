$(document).ready(function() {
    var data = [{
            x: new Date(2001, 8, 1),
            x1: 1,
            y: 14461
        },
        {
            x: new Date(2001, 8, 2),
            x1: 2,
            y: 14210
        },
        {
            x: new Date(2001, 8, 3),
            x1: 3,
            y: 16660
        },
        {
            x: new Date(2001, 8, 4),
            x1: 4,
            y: 17225
        },
        {
            x: new Date(2001, 8, 5),
            x1: 5,
            y: 17325
        },
        {
            x: new Date(2001, 8, 6),
            x1: 6,
            y: 17330
        },
        {
            x: new Date(2001, 8, 7),
            x1: 7,
            y: 17078
        },
        {
            x: new Date(2001, 8, 8),
            x1: 8,
            y: 15322
        },
        {
            x: new Date(2001, 8, 9),
            x1: 9,
            y: 16522
        },
        {
            x: new Date(2001, 8, 10),
            x1: 10,
            y: 16905
        },
        {
            x: new Date(2001, 8, 11),
            x1: 11,
            y: 2541
        },
        {
            x: new Date(2001, 8, 12),
            x1: 12,
            y: 1
        },
        {
            x: new Date(2001, 8, 13),
            x1: 13,
            y: 1445
        },
        {
            x: new Date(2001, 8, 14),
            x1: 14,
            y: 7745
        },
        {
            x: new Date(2001, 8, 15),
            x1: 15,
            y: 9634
        },
        {
            x: new Date(2001, 8, 16),
            x1: 16,
            y: 12243
        },
        {
            x: new Date(2001, 8, 17),
            x1: 17,
            y: 13708
        },
        {
            x: new Date(2001, 8, 18),
            x1: 18,
            y: 13799
        },
        {
            x: new Date(2001, 8, 19),
            x1: 19,
            y: 14321
        },
        {
            x: new Date(2001, 8, 20),
            x1: 20,
            y: 14249
        },
        {
            x: new Date(2001, 8, 21),
            x1: 21,
            y: 14229
        },
        {
            x: new Date(2001, 8, 22),
            x1: 22,
            y: 12431
        },
        {
            x: new Date(2001, 8, 23),
            x1: 23,
            y: 13852
        },
        {
            x: new Date(2001, 8, 24),
            x1: 24,
            y: 14303
        },
        {
            x: new Date(2001, 8, 25),
            x1: 25,
            y: 14325
        },
        {
            x: new Date(2001, 8, 26),
            x1: 26,
            y: 14355
        },
        {
            x: new Date(2001, 8, 27),
            x1: 27,
            y: 14393
        },
        {
            x: new Date(2001, 8, 28),
            x1: 28,
            y: 14436
        },
        {
            x: new Date(2001, 8, 29),
            x1: 29,
            y: 12596
        },
        {
            x: new Date(2001, 8, 30),
            x1: 30,
            y: 13730
        },


    ];
    var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 30
        },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;



    var svg_flights = d3.select("#flights")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "no-hover")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .domain([new Date(2001, 8, 1), new Date(2001, 9, 1)])
        // .domain(d3.extent(data, d => new Date(d.x)))
        .range([margin.left, width - margin.right])

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)]).nice()
        .range([height - margin.bottom, margin.top])


    var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))


    var yAxis = d3.axisLeft()
        // .attr("transform", `translate(10,0)`)
        .scale(y);
    svg_flights.append("g")
        .attr("class", "y_axis")
        .attr("transform", "translate(30, 0)")
        .call(yAxis);
    //add a y-axis title
    svg_flights.append("text")
        .attr("x", 0)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("transform", "translate(0, -10)")
        .attr("fill", "white")
        .text("Count");

    var line = d3.line()
        .defined(d => !isNaN(d.y))
        .x(d => x(d.x))
        .y(d => y(d.y))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg_flights.append("g")
        .attr("class", "x_axis")
        .call(xAxis);

    svg_flights.append("line")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", 10)
        .attr("x1", x(new Date(2001, 8, 11)))
        .attr("x2", x(new Date(2001, 8, 11)))
        .attr("y1", height / 2 - 30)
        .attr("y2", height - margin.bottom);


    svg_flights.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

    var tooltip_flights = d3.select("body")
        .append("div")
        .attr("class", "tooltip_flights")
        //.style("background", "black")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    svg_flights.selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr("fill", "white")
        .attr("cx", function(d) {
            return x(d.x);
        })
        .attr("cy", function(d) {
            return y(d.y);
        })
        .attr("r", 4)
        .on("mouseover", function(d) {
            tooltip_flights.html("");
            tooltip_flights.style("visibility", "visible")
            // .style("border", "7px solid " + "steelblue");
            tooltip_flights.append("div")
                .text("Date: " + d.x1 + ", Sep")
                // .text("Date: "+d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse(d.x))


                .attr("font-weight", "bold")
                .style("color", "white");
            tooltip_flights.append("div")
                .style("color", "white")
                .attr("font-weight", "bold")
                .text("Count: " + d.y);
            //d3.selectAll("path").style("opacity", 0.5);
            d3.selectAll("circle").style("opacity", 0.5).attr("fill", "white");
            d3.select(this)
                .style("opacity", 1)
                .style("stroke", "#222")
                .style("opacity", 1)
                .raise();
        })
        .on("mousemove", function() {
            return tooltip_flights.style("top", (d3.event.pageY - 52) + "px").style("left", (d3.event.pageX + 18) + "px");
        })
        .on("mouseout", function(d) {
            tooltip_flights.style("visibility", "hidden");
            d3.selectAll("circle").style("opacity", 1).attr("fill", "white");
        });

    svg_flights.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("y", height - margin.bottom - 10)
        .attr("x", width - 20)
        .attr("fill", "white")
        .text("Date");

    svg_flights.append("text")
        .attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("x", x(new Date("2001-09-11")))
        .attr("y", height / 2 - 40)

        .text("911 Attack");
});
