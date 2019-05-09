$(document).ready(function() {
    // Create 4 datasets
    var profit_AA = [{
            Year: "2000-Q1",
            Domestic: 69607,
            International: 35476
        },
        {
            Year: "2000-Q2",
            Domestic: 226493,
            International: 97112
        },
        {
            Year: "2000-Q3",
            Domestic: 189292,
            International: 126820
        },
        {
            Year: "2000-Q4",
            Domestic: 26417,
            International: 6786
        },
        {
            Year: "2001-Q1",
            Domestic: -96984,
            International: 42221
        },
        {
            Year: "2001-Q2",
            Domestic: -473359,
            International: -36259
        },
        {
            Year: "2001-Q3",
            Domestic: -387386,
            International: -96568
        },
        {
            Year: "2001-Q4",
            Domestic: -396983,
            International: -137512
        },
        {
            Year: "2002-Q1",
            Domestic: -1099842,
            International: -331636
        },
        {
            Year: "2002-Q2",
            Domestic: -412967,
            International: -72752
        },
        {
            Year: "2002-Q3",
            Domestic: -789387,
            International: -61523
        },
        {
            Year: "2002-Q4",
            Domestic: -602512,
            International: -125041
        },
        {
            Year: "2003-Q1",
            Domestic: -963145,
            International: -78444
        },
        {
            Year: "2003-Q2",
            Domestic: -284473,
            International: 151535
        },
        {
            Year: "2003-Q3",
            Domestic: -276719,
            International: 252480
        },
        {
            Year: "2003-Q4",
            Domestic: -295354,
            International: 165629
        }
        // {Year: "2004-Q1", Domestic:  -357163, International: 175490},
        // {Year: "2004-Q2", Domestic:  -235756, International: 222821},
        // {Year: "2004-Q3", Domestic:  -328165, International: 102289},
        // {Year: "2004-Q4", Domestic:  -393780, International: -6717},
        // {Year: "2005-Q1", Domestic:  -223297, International: 52145},
        // {Year: "2005-Q2", Domestic:  -45447, International: 86171},
        // {Year: "2005-Q3", Domestic:  -269074, International: 108749},
        // {Year: "2005-Q4", Domestic:  -437179, International: -163787},
        // {Year: "2006-Q1", Domestic:  -108444, International: 2587},
        // {Year: "2006-Q2", Domestic:  118615, International: 160864},
        // {Year: "2006-Q3", Domestic:  -168282, International: 169012},
        // {Year: "2006-Q4", Domestic:  -131966, International: 121490},
        // {Year: "2007-Q1", Domestic:  -100332, International: 151476},
        // {Year: "2007-Q2", Domestic:  83247, International: 187361},
        // {Year: "2007-Q3", Domestic:  -69245, International: 215819},
        // {Year: "2007-Q4", Domestic:  -204180, International: 91635},
        // {Year: "2008-Q1", Domestic:  -339972, International: -3938},
        // {Year: "2008-Q2", Domestic:  -1027770, International: -434962},
        // {Year: "2008-Q3", Domestic:  -498176, International: 102004},
        // {Year: "2008-Q4", Domestic:  -42160, International: -285768}


    ];

    var profit_UA = [{
            Year: "2000-Q1",
            Domestic: -48257,
            International: -32833
        },
        {
            Year: "2000-Q2",
            Domestic: 268331,
            International: 62509
        },
        {
            Year: "2000-Q3",
            Domestic: -124854,
            International: 13711
        },
        {
            Year: "2000-Q4",
            Domestic: -105272,
            International: 18289
        },
        {
            Year: "2001-Q1",
            Domestic: -196074,
            International: -125324
        },
        {
            Year: "2001-Q2",
            Domestic: -156296,
            International: -137420
        },
        {
            Year: "2001-Q3",
            Domestic: -746158,
            International: -433062
        },
        {
            Year: "2001-Q4",
            Domestic: -180248,
            International: -135627
        },
        {
            Year: "2002-Q1",
            Domestic: -307046,
            International: -188856
        },
        {
            Year: "2002-Q2",
            Domestic: -240534,
            International: -122719
        },
        {
            Year: "2002-Q3",
            Domestic: -630804,
            International: -280515
        },
        {
            Year: "2002-Q4",
            Domestic: -989668,
            International: -565640
        },
        {
            Year: "2003-Q1",
            Domestic: -921885,
            International: -464102
        },
        {
            Year: "2003-Q2",
            Domestic: -383024,
            International: -271665
        },
        {
            Year: "2003-Q3",
            Domestic: -259856,
            International: -155785
        },
        {
            Year: "2003-Q4",
            Domestic: -411780,
            International: -218129
        }
        // {Year: "2004-Q1", Domestic:  -435518, International: -107229},
        // {Year: "2004-Q2", Domestic:  -274591, International: -28070},
        // {Year: "2004-Q3", Domestic:  -322545, International: -15097},
        // {Year: "2004-Q4", Domestic:  -666408, International: -152689},
        // {Year: "2005-Q1", Domestic:  -647427, International: -364975},
        // {Year: "2005-Q2", Domestic:  -911943, International: -558157},
        // {Year: "2005-Q3", Domestic:  -1016756, International: -642577},
        // {Year: "2005-Q4", Domestic:  -10256486, International: -6656063},
        // {Year: "2006-Q1", Domestic:  1336718, International: 9073906},
        // {Year: "2006-Q2", Domestic:  117950, International: -7206},
        // {Year: "2006-Q3", Domestic:  119281, International: 76380},
        // {Year: "2006-Q4", Domestic:  -68171, International: 9326},
        // {Year: "2007-Q1", Domestic:  -165640, International: 14827},
        // {Year: "2007-Q2", Domestic:  123464, International: 163486},
        // {Year: "2007-Q3", Domestic:  142235, International: 170220},
        // {Year: "2007-Q4", Domestic:  -140699, International: 40609},
        // {Year: "2008-Q1", Domestic:  -425421, International: -110880},
        // {Year: "2008-Q2", Domestic:  -329136, International: -1074747},
        // {Year: "2008-Q3", Domestic:  -470419, International: -269303},
        // {Year: "2008-Q4", Domestic:  -641522, International: -505725}

    ];


    var profit_Delta = [


        {
            Year: "2000-Q1",
            Domestic: 274235,
            International: -41771
        },
        {
            Year: "2000-Q2",
            Domestic: 426971,
            International: 7517
        },
        {
            Year: "2000-Q3",
            Domestic: 21392,
            International: 35562
        },
        {
            Year: "2000-Q4",
            Domestic: -27756,
            International: -9687
        },
        {
            Year: "2001-Q1",
            Domestic: -106518,
            International: -30963
        },
        {
            Year: "2001-Q2",
            Domestic: -13969,
            International: -12804
        },
        {
            Year: "2001-Q3",
            Domestic: -188135,
            International: -49630
        },
        {
            Year: "2001-Q4",
            Domestic: -538807,
            International: -166227
        },
        {
            Year: "2002-Q1",
            Domestic: -252792,
            International: -145218
        },
        {
            Year: "2002-Q2",
            Domestic: -129072,
            International: -74508
        },
        {
            Year: "2002-Q3",
            Domestic: -250985,
            International: -91241
        },
        {
            Year: "2002-Q4",
            Domestic: -226127,
            International: -125034
        },
        {
            Year: "2003-Q1",
            Domestic: -370524,
            International: -105549
        },
        {
            Year: "2003-Q2",
            Domestic: 127450,
            International: 1902
        },
        {
            Year: "2003-Q3",
            Domestic: -203635,
            International: 10812
        },
        {
            Year: "2003-Q4",
            Domestic: -324439,
            International: -31613
        }
        // {Year: "2004-Q1", Domestic:  -355460, International: -36333},
        // {Year: "2004-Q2", Domestic:  -1632097, International: -340894},
        // {Year: "2004-Q3", Domestic:  -584823, International: -72971},
        // {Year: "2004-Q4", Domestic:  -311306, International: -28295}
        // {Year: "2005-Q1", Domestic:  -897697, International: -158521},
        // {Year: "2005-Q2", Domestic:  -376771, International: -13864},
        // {Year: "2005-Q3", Domestic:  -913559, International: -207639},
        // {Year: "2005-Q4", Domestic:  -921343, International: -308157},
        // {Year: "2006-Q1", Domestic:  -1550844, International: -521441},
        // {Year: "2006-Q2", Domestic:  -1497819, International: -626732},
        // {Year: "2006-Q3", Domestic:  97246, International: -82906},
        // {Year: "2006-Q4", Domestic:  -1272938, International: -541249},
        // {Year: "2007-Q1", Domestic:  53423, International: -116082},
        // {Year: "2007-Q2", Domestic:  1360046, International: 403981},
        // {Year: "2007-Q3", Domestic:  199242, International: 1960},
        // {Year: "2007-Q4", Domestic:  1910, International: -110160},
        // {Year: "2008-Q1", Domestic:  -4458674, International: -1947206},
        // {Year: "2008-Q2", Domestic:  -601748, International: -463655},
        // {Year: "2008-Q3", Domestic:  32646, International: -98033},
        // {Year: "2008-Q4", Domestic:  -452519, International: -443528}


    ];


    var profit_SW = [


        {
            Year: "2000-Q1",
            Domestic: 73512,
            International: 0
        },
        {
            Year: "2000-Q2",
            Domestic: 190623,
            International: 0
        },
        {
            Year: "2000-Q3",
            Domestic: 184298,
            International: 0
        },
        {
            Year: "2000-Q4",
            Domestic: 154660,
            International: 0
        },
        {
            Year: "2001-Q1",
            Domestic: 121045,
            International: 0
        },
        {
            Year: "2001-Q2",
            Domestic: 175642,
            International: 0
        },
        {
            Year: "2001-Q3",
            Domestic: 150964,
            International: 0
        },
        {
            Year: "2001-Q4",
            Domestic: 63505,
            International: 0
        },
        {
            Year: "2002-Q1",
            Domestic: 21385,
            International: 0
        },
        {
            Year: "2002-Q2",
            Domestic: 102298,
            International: 0
        },
        {
            Year: "2002-Q3",
            Domestic: 74887,
            International: 0
        },
        {
            Year: "2002-Q4",
            Domestic: 42399,
            International: 0
        },
        {
            Year: "2003-Q1",
            Domestic: 23860,
            International: 0
        },
        {
            Year: "2003-Q2",
            Domestic: 245901,
            International: 0
        },
        {
            Year: "2003-Q3",
            Domestic: 106097,
            International: 0
        },
        {
            Year: "2003-Q4",
            Domestic: 65781,
            International: 0
        }
        // {Year: "2004-Q1", Domestic:  25808, International: 0},
        // {Year: "2004-Q2", Domestic:  112852, International: 0},
        // {Year: "2004-Q3", Domestic:  119179, International: 0},
        // {Year: "2004-Q4", Domestic:  55530, International: 0},
        // {Year: "2005-Q1", Domestic:  76270, International: 0},
        // {Year: "2005-Q2", Domestic:  158784, International: 0},
        // {Year: "2005-Q3", Domestic:  227271, International: 0},
        // {Year: "2005-Q4", Domestic:  86058, International: 0},
        // {Year: "2006-Q1", Domestic:  61462, International: 0},
        // {Year: "2006-Q2", Domestic:  333003, International: 0},
        // {Year: "2006-Q3", Domestic:  47870, International: 0},
        // {Year: "2006-Q4", Domestic:  56745, International: 0},
        // {Year: "2007-Q1", Domestic:  92745, International: 0},
        // {Year: "2007-Q2", Domestic:  278324, International: 0},
        // {Year: "2007-Q3", Domestic:  162217, International: 0},
        // {Year: "2007-Q4", Domestic:  111388, International: 0},
        // {Year: "2008-Q1", Domestic:  33563, International: 0},
        // {Year: "2008-Q2", Domestic:  320985, International: 0},
        // {Year: "2008-Q3", Domestic:  -120315, International: 0},
        // {Year: "2008-Q4", Domestic:  -55992, International: 0}



    ]


    // set the dimensions and margins of the graph
    var margin = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 60
        },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#profit_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Initialise a X axis:
    var x = d3.scalePoint().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


    var quarter_tickformat = function(quarter, i) {

        if (quarter.slice(-1) === "1") {
            return quarter;
            console.log(quarter);
        } else {
            return "";
            console.log(quarter);
        }

    };

    // var x = d3.scaleLinear().range([0,width]);
    var xAxis = d3.axisBottom().scale(x).tickFormat(quarter_tickformat);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")

    // Initialize an Y axis
    // var y = d3.scaleLinear().range([height, 0]);

    var yAxis = d3.axisLeft().scale(y);
    svg.append("g")
        .attr("class", "myYaxis")



    var colors = ["rgba(54, 174, 175, 0.65)", "rgba(249, 208, 87, 0.7)"];

    var legend = svg.selectAll(".myLegend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(-80," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
            return colors.slice()[i];
        });

    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-family", "sans-serif")
        .style("font-size", "13px")
        .style("fill", "white")
        .text(function(d, i) {
            switch (i) {
                case 0:
                    return "Domestic";
                case 1:
                    return "International";
            }
        });

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        //         .style("font-family", "sans-serif")
        .style("fill", "white")
        //         .style("text-decoration", "underline")
        .text("Net Income in $000");

    // Create a function that takes a dataset as input and update the plot:
    function update(data) {

        // Create the X axis:
        x.domain(data.map(function(d) {
            return d.Year;
        }));
        svg.selectAll(".myXaxis").transition()
            .duration(3000)
            .call(xAxis);

        // create the Y axis
        y.domain([Math.min(d3.min(data, function(d) {
            return d.Domestic
        }), d3.min(data, function(d) {
            return d.International
        })), Math.max(d3.max(data, function(d) {
            return d.Domestic
        }), d3.max(data, function(d) {
            return d.International
        }))]);
        svg.selectAll(".myYaxis")
            .transition()
            .duration(3000)
            .call(yAxis);


        var area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) {
                return x(d.Year);
            })
            .y0(y(0))
            .y1(function(d) {
                return y(d.Domestic);
            });

        // Create a update selection: bind to the new data
        var u = svg.selectAll(".areaD")
            .data([data], function(d) {
                return d.Year
            });

        var color = d3.scaleOrdinal()
            .domain(["Domestic", "International"])
            // .range(["rgba(0, 0, 200, 0.7)", "rgba(54, 174, 175, 0.65)"]);

            .range(["rgba(54, 174, 175, 0.65)", "rgba(249, 208, 87, 0.7)"]);
        // Updata the line
        u
            .enter()
            .append("path")
            .attr("class", "areaD")
            .merge(u)
            .transition()
            .duration(3000)
            .attr("d", d3.area()
                .curve(d3.curveMonotoneX)
                .x(function(d) {
                    return x(d.Year);
                })
                .y0(y(0))
                .y1(function(d) {
                    return y(d.Domestic);
                }))
            .style("fill", function(d) {
                return color("Domestic");
            });

        var v = svg.selectAll(".areaI")
            .data([data], function(d) {
                return d.Year
            });

        v
            .enter()
            .append("path")
            .attr("class", "areaI")
            .merge(v)
            .transition()
            .duration(3000)
            .attr("d", d3.area()
                .curve(d3.curveMonotoneX)
                .x(function(d) {
                    return x(d.Year);
                })
                .y0(y(0))
                .y1(function(d) {
                    return y(d.International);
                }))
            .style("fill", function(d) {
                return color("International");
            });

    }

    // At the beginning, I run the update function on the first dataset:
    update(profit_AA);


    $('#company_btn').click(function() {
        var company = $("input[name='company']:checked").val();
        console.log(company);
        if (company == "AA") {
            update(profit_AA);
        } else if (company == "UA") {
            update(profit_UA);
        } else if (company == "Delta") {
            update(profit_Delta);
        } else if (company == "SW") {
            update(profit_SW);
        }

    });



});
