var app = app || {};
app.init = function(){
  
  var bodySelection = d3.select("body");
 
 var svgSelection = bodySelection.append("svg")
       .attr("width", 50)
       .attr("height", 50);
 
 var circleSelection = svgSelection.append("circle")
       .attr("cx", 25)
       .attr("cy", 25)
      .attr("r", 25)
      .style("fill", "purple");
  
    var theData = [ 1, 2, 3 ];  
    var p = d3.select("body").selectAll("p")
    .data(theData)
    .enter()
    .append("p");
    
    var w1 = parseInt( $( "#graph1" ).width() );
   app.drawAxes( w1,150 );
    
    
}
app.drawAxes = function( w, h){
 
     var axesColor = "#808080";
     var ticksColor = "#606060";
     var gridColor = "#C0C0C0";
    
     var marginX =10;
     var marginY =5;
    
    
     var labelH  = 25;
    
     var tickH = 25;
     var tickM = 10;
    
    
     var graph = d3.select("#graph1");
     var svgSelection = graph.append("svg")
       .attr("width", w)
       .attr("height", h);
    
    var rectangle = svgSelection.append("rect")
                             .attr("x", 0)
                             .attr("y", 0)
                             .attr("width", w)
                             .attr("height", h)
                             .attr("fill", "yellow");
    
    var lineX1 = svgSelection.append("line")
           .attr("x1", 0 + marginX )
           .attr("y1", labelH + marginY)
           .attr("x2", w - marginX)
           .attr("y2", labelH + marginY)
           .attr("stroke-width", 1)
           .attr("stroke", axesColor );
    
      var lineX2 = svgSelection.append("line")
           .attr("x1", 0 + marginX )
           .attr("y1", h -  marginY)
           .attr("x2", w - marginX)
           .attr("y2", h -  marginY)
           .attr("stroke-width", 1)
           .attr("stroke", gridColor );
    
    
    //var dX = Math.round( w / 24);
     var dX =  ( w - 2 * marginX)  / 24;
    
      var ticsM1 = svgSelection.append("line")
                                   .attr("x1",   dX/2 + marginX )
                                   .attr("y1",  labelH + marginY)
                                   .attr("x2",  dX/2 + marginX)
                                   .attr("y2",  labelH  + tickM + marginY)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", ticksColor );
    
    for(var i = 0; i < 25; i++){
        var ticsH = svgSelection.append("line")
                                   .attr("x1",  i * dX + marginX)
                                   .attr("y1",  labelH + marginY)
                                   .attr("x2",  i * dX + marginX)
                                   .attr("y2",  labelH + marginY + tickH)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", ticksColor );
        
         var ticsHdot = svgSelection.append("line")
                                   .attr("x1",  i * dX + marginX)
                                   .attr("y1",  labelH + marginY + tickH)
                                   .attr("x2",  i * dX + marginX)
                                   .attr("y2",  h - marginY)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", gridColor );
            var a = 0;
        
        
            var a = 0;
            if ( i > 9) a = 4;
            if ( i > 16) a = 6;
            var textLabels = svgSelection.append("text")
                         .attr("x", i * dX  + marginX - a)
                         .attr("y",  marginY + labelH/2)
                         .text( function (d) { return   i + "h" ; })
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "10px")
                         .attr("fill", axesColor);
    }
     for(var j = 0; j < 23; j++){
      var ticsM = svgSelection.append("line")
                                   .attr("x1",   (j + 1) * dX + dX/2 + marginX )
                                   .attr("y1",  labelH + marginY)
                                   .attr("x2",  (j +1)  * dX + dX/2 + marginX)
                                   .attr("y2",   labelH + tickM + marginY)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", ticksColor );
        
    }
    
    
        
}

         