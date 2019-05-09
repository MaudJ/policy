$(document).ready(function() {
    var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 60
        },
        width = 800 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var svg_map = d3.select("#map")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var states = null;
    var projection = d3.geoAlbers();

    d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/us.json").then(function(map) {

        var isContinental = function(d) {
            var id = +d.id;
            return id < 60 && id !== 2 && id !== 15;
        };
        map.objects.states.geometries = map.objects.states.geometries.filter(isContinental);

        states = topojson.feature(map, map.objects.states);
        projection.fitSize([width, height], states);

        var base = svg_map.append("g").attr("class", "basemap");
        var path = d3.geoPath(projection);

        base.datum(states)
            .append("path")
            .attr("class", "land")
            .attr("d", path)
            .attr("fill", "#dddddd");

        var isInterior = function(a, b) {
            return a !== b;
        };

        base.append("path")
            .attr("class", "border interior")
            .attr("d", path(topojson.mesh(map, map.objects.states, isInterior)))
            .attr("stroke", "white")
            .attr("fill", "#dddddd");

        d3.csv("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/airports-lat-long-2.csv").then(function(airports) {

            airports = airports.filter(function(d) {
                return d3.geoContains(states, [d.longitude, d.latitude]);
            });

            airports.forEach(function(d) {
                var coords = projection([d.longitude, d.latitude]);
                d.x = coords[0];
                d.y = coords[1];
            });

            svg_map.append("g").attr("class", "airports")
                .selectAll("g.airports")
                .data(airports)
                .enter()
                .append("circle")
                .attr("r", 4)
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
                .style("fill", "#252525")
                .style("opacity", 0.6)
                .style("stroke", "white");

            d3.csv("https://raw.githubusercontent.com/caz2114/datavis-hw5/master/data/2001-09-11-cleaned-3.csv").then(function(flights) {

                flights.forEach(function(d) {
                    var coords = projection([d.longitude, d.latitude]);
                    d.x = coords[0];
                    d.y = coords[1];
                });

                var drawline = d3.line()
                    .curve(d3.curveBundle.beta(0.5))
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    });

                var multiLineData = null;

                var lineColor = function(d) {
                    if (parseInt(d[0].cancelled) == 1) {
                        return "#880000";
                    }
                    if (parseInt(d[0].diverted) == 1) {
                        return "blue";
                    }
                    return "grey";
                };

                function drawFlights(data) {
                    svg_map.selectAll(".flights").remove();

                    multiLineData = d3.nest()
                        .key(d => d.id)
                        .entries(data);

                    svg_map.append("g").attr("class", "flights")
                        .selectAll(".flights")
                        .data(multiLineData)
                        .enter()
                        .append("path")
                        .attr("d", function(d) {
                            return drawline(d.values);
                        })
                        .attr("stroke", function(d) {
                            return lineColor(d.values);
                        })
                        .attr("stroke-width", "0.5px")
                        .attr("opacity", 0.5);
                };

                function filterFlights(time) {
                    var newData = flights.filter(function(d) {
                        return Math.floor(d.crs_dep_time / 100) == time;
                    });

                    drawFlights(newData);
                };

                filterFlights(0);

                d3.select("#add").on("click", function() {
                    var time = document.getElementById("show_time").innerText.split(":")[0];
                    if (parseInt(time) == 23) {
                        return;
                    }
                    var newtime = "" + (parseInt(time) + 1);
                    filterFlights(newtime);
                    d3.select('#show_time').text(newtime + ":00-" + (parseInt(newtime) + 1) + ":00");
                    document.getElementById("slider").value = newtime;
                });

                d3.select("#minus").on("click", function() {
                    var time = document.getElementById("show_time").innerText.split(":")[0];
                    if (parseInt(time) == 0) {
                        return;
                    }
                    var newtime = "" + (parseInt(time) - 1);
                    filterFlights(newtime);
                    d3.select('#show_time').text(newtime + ":00-" + time + ":00");
                    document.getElementById("slider").value = newtime;
                });

                d3.select("#slider").on("change", function(d) {
                    var time = this.value;
                    var time2 = parseInt(time) + 1;
                    filterFlights(time);
                    d3.select('#show_time').text(time + ":00-" + (parseInt(time) + 1) + ":00");
                });

                var legend_keys = ["normal", "cancelled", "diverted"];
                var colorScale = d3.scaleOrdinal()
                    .domain(legend_keys)
                    .range(["grey", "#880000", "blue"]);

                var lineLegend = svg_map.selectAll(".lineLegend")
                    .data(legend_keys)
                    .enter().append("g")
                    .attr("class", "lineLegend")
                    .attr("transform", function(d, i) {
                        return "translate(" + (100 + width * 0.3 * i) + "," + height + ")";
                    });

                lineLegend.append("text").text(function(d) {
                        return d;
                    })
                    .attr("transform", "translate(20,10)") //align texts with boxes
                    .attr("fill", "white");

                lineLegend.append("rect")
                    .attr("fill", function(d, i) {
                        return colorScale(d);
                    })
                    .attr("width", 10)
                    .attr("height", 10);

            });

        });

    });
});
