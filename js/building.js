building = function(svg, dime) {
  var width = 700;
  var height = 620;
  const building = svg.append('g')
  
  const h = height-dime.height-dime.y+10
  const x = { left:dime.x-60, middle:dime.x, right:dime.x + 60 }
  const y = { topTop:h-30, topMiddle:h, topBottom:h+30, bottomMiddle:h+dime.height, bottomBottom:h+dime.height+30 }
  const z = { level1: y.topBottom+50 }
  
  const colours = { top:'#000000', left:'#000000', right:'#000000' }
    
  // roof
  building.append('polygon').attr('points', 
      x.middle+', '+ y.topTop + ' '+
      x.right+', '+ y.topMiddle + ' '+
      x.middle+', '+ y.topBottom + ' '+
      x.left +', '+ y.topMiddle
   ).attr('fill', colours.top)
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', 2)
  
  // sides
  const sides = ['left', 'right']
  sides.forEach((side) => 
    building.append('polygon').attr('points', 
      x.middle+','+y.topBottom+' '+
      x[side]+','+y.topMiddle+' '+
      x[side]+','+y.bottomMiddle+' '+
      x.middle+','+y.bottomBottom                        
   ).attr('fill', colours[side])
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', 2)                 
  )
  
  const windowSpace = 50;
  let windowCount = dime.height/windowSpace;
  
  while(windowCount > 1) {
    
    let top = h-40 + (windowSpace * windowCount)
    
    // floor
    building.append('polyline')
        .attr('points', x.left+','+(top-9)+' '+x.middle+','+(top+21)+' '+x.right+','+(top-9))
        .attr('stroke', '#FFFFFF')
        .attr('fill', 'transparent')
        .attr('stroke-width', 2)
        .attr('opacity', 1)
    
    
    --windowCount
  }
  if (dime.buildingId == dime.key){
    var floorId = dime.floorId;
  var tempLeftBottom = -floorId * windowSpace + y.bottomMiddle;
  var tempLeftUp= -(floorId+1) * windowSpace + y.bottomMiddle;
  var tempMiddleBottom = -floorId * windowSpace + y.bottomBottom;
  var tempMiddleUp= -(floorId+1) * windowSpace + y.bottomBottom;
  
      building.append('polygon').attr('points', 
      x.middle+', '+ tempMiddleBottom + ' '+
      x.middle+', '+ tempMiddleUp + ' '+
      x.left +', '+ tempLeftUp + ' '+
      x.left +', '+ tempLeftBottom
   ).attr('fill', '#FFE4B5')
    .attr('stroke', '#FFFFFF')
    .attr('class','house')
    .attr('stroke-width', 2);
  
  building.append('polygon').attr('points', 
      x.middle+', '+ tempMiddleBottom + ' '+
      x.middle+', '+ tempMiddleUp + ' '+
      x.right +', '+ tempLeftUp + ' '+
      x.right +', '+ tempLeftBottom
   ).attr('fill', '#FFE4B5')
    .attr('stroke', '#FFFFFF')
    .attr('class','house')
    .attr('stroke-width', 2);
  };
}

chart = function (buildingId,floorId ){

  var data = [200,200,250];
  var width = 700;
  var height = 620;

  var svg_buildings = d3.select("#buildingGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "no-hover")
        .append("g");
  
  //const svg = d3.select(DOM.svg(width, height))
  svg_buildings.style('background', 'linear-gradient(150deg, rgba(105,105,105,1) 0%, rgba(150,150,150,1) 29%, rgba(211,211,211,1) 84%)');
  
  data.forEach((num, key, arr) => {
    let x = ((arr.length - key) * 80) + 30,
        y = ((arr.length - key) * 40) + 30,
        height = (num / d3.max(data)) * 250
    building(svg_buildings, { height:height, x:x, y:y, key:key, buildingId:buildingId,  floorId:floorId })
  })


   // var tooltip_building = svg_buildings.append("g")
   //  .attr("class", "tooltip_building")
   //  .style("display", "none");

  // tooltip_building.append("rect")
  //   .attr("x", -55)
  //   .attr("width", 150)
  //   .attr("height", 20)
  //   .attr("fill", "black")
  //   .style("opacity", 1);

  // tooltip_building.append("text")
  //   .attr("x", 15)
  //   .attr("dy", "1.2em")
  //   .attr("fill", "white")
  //   .style("text-anchor", "middle")
  //   .attr("font-size", "14px")
  //   .attr("font-weight", "bold");

  // svg_buildings.selectAll(".house")
  // .on("mouseover", function(){
  //         tooltip_building.style("display", null);
  //         var firstChild = this.parentNode.parentNode.firstChild;
  //         if (d3.select(firstChild).attr("class") == "tooltip_building") {
  //           this.parentNode.parentNode.insertBefore(this.parentNode, firstChild);
  //         }
  //     })
  //     .on("mousemove", function(d) {
    
  //         var tempBuilding = buildingId+1;
  //         var tempFloor = floorId+1;
  //         var xPosition = parseInt(d3.mouse(this)[0] - 15);
  //         var yPosition = parseInt(d3.mouse(this)[1] - 25);
  //         tooltip_building.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
  //         tooltip_building.select("text").text("Method: "+name+" Building: "+tempBuilding+"   Floor: "+tempFloor);
  //    }) 
    
          
  //     .on("mouseout", function() {
  //         tooltip_building.style("display", "none");
  //     });
      return svg_buildings;


    }





updateBuilding = function(svgBuildings,name,flag){
//   var buildingId, floorId;
// $('#method_btn').click(function(){
//   var method = $("input[name='method']:checked").val();
//   console.log(method);
//   if (method == "KNN"){
//       //update(profit_AA);
//       buildingId = 1;
//       floorId = 1;
//   }
//     else{
//       buildingId = 2;
//       floorId = 2;
//     }

// });
var seed;
if (flag==-1){
 seed =Math.floor(Math.random() * 1000);
}
else{
seed = flag;
}

var buildingId;
  var floorId ;

d3.csv("https://raw.githubusercontent.com/MaudJ/policyFinal/master/final.csv").then
(  function (ids) {
  if (name=="KNN"){
    buildingId = parseInt(ids[seed]["knnBuilding"]);
    floorId = parseInt(ids[seed]["knnFloor"]);
  }
  else if (name=="SVM"){
    buildingId = parseInt(ids[seed]["svmBuilding"]);
    floorId = parseInt(ids[seed]["svmFloor"]);
  }
  else if (name=="FFN"){
    buildingId = parseInt(ids[seed]["ffnBuilding"]);
    floorId = parseInt(ids[seed]["ffnFloor"]);
  }
  else if (name=="DT"){
    buildingId = parseInt(ids[seed]["dtBuilding"]);
    floorId = parseInt(ids[seed]["dtFloor"]);
  }
  else if (name=="SAE"){
    buildingId = parseInt(ids[seed]["saeBuilding"]);
    floorId = parseInt(ids[seed]["saeFloor"]);
  }

else{
buildingId = parseInt(ids[seed]["correctBuilding"]);
    floorId = parseInt(ids[seed]["correctFloor"]);
}


  var data = [200,200,250];

svgBuildings.selectAll(".house")
  .attr("class","none");
  data.forEach((num, key, arr) => {
    let x = ((arr.length - key) * 80) + 30,
        y = ((arr.length - key) * 40) + 30,
        height = (num / d3.max(data)) * 250
    building(svgBuildings, { height:height, x:x, y:y, key:key, buildingId:buildingId,  floorId:floorId })
  });
   var tooltip_building = svgBuildings.append("g")
    .attr("class", "tooltip_building")
    .style("display", "none");

  tooltip_building.append("rect")
    .attr("x", -100)
    .attr("width", 250)
    .attr("height", 20)
    .attr("fill", "black")
    .style("opacity", 1);

  tooltip_building.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .attr("fill", "white")
    .style("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("font-weight", "bold");

  svgBuildings.selectAll(".house")
  .on("mouseover", function(){
          tooltip_building.style("display", null);
          var firstChild = this.parentNode.parentNode.firstChild;
          if (d3.select(firstChild).attr("class") == "tooltip_building") {
            this.parentNode.parentNode.insertBefore(this.parentNode, firstChild);
          }
      })
      .on("mousemove", function(d) {
    
          var tempBuilding = buildingId+1;
          var tempFloor = floorId+1;
          var xPosition = parseInt(d3.mouse(this)[0] - 15);
          var yPosition = parseInt(d3.mouse(this)[1] - 25);
          tooltip_building.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip_building.select("text").text("Method: "+name+" Building: "+tempBuilding+"   Floor: "+tempFloor);
     }) 
    
          
      .on("mouseout", function() {
          tooltip_building.style("display", "none");
      });

});
console.log(seed); 
return seed;

}
