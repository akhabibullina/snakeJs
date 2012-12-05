/**
 * Use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
   baseUrl: "js",
   paths: {
      "lib": "lib",
      "jquery": "lib/jquery.min"
   },
   shim: {
      'lib/raphael': {
         exports: 'Raphael'
      }
   }
});

define(['board'], function(Board) {
   var canvas = document.getElementById('game-area');
   var mySnakeBoard = new Board({ "gamePlay" : canvas});

//// Creates canvas 320 × 200 at 10, 50
//var paper = Raphael(10, 50, 320, 200);
//
//// Creates circle at x = 50, y = 40, with radius 10
//var circle = paper.circle(50, 40, 10);
//// Sets the fill attribute of the circle to red (#f00)
//circle.attr("fill", "#f00");
//
//// Sets the stroke attribute of the circle to white
//circle.attr("stroke", "#fff");
});