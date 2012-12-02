/**
 * Use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
   baseUrl: "js",
   paths: {
      "lib": "lib",
      "jquery": "lib/jquery.min"
   }
//   shim: {
//      'lib/jquery-ui/js/jquery-ui.min': {
//         deps: ['jquery'],
//         exports: 'jquery-ui'
//      }
//   }
});

define(['board'], function(Board) {
   var canvas = document.getElementById('game-area');
   var mySnakeBoard = new Board({ "gamePlay" : canvas});

});