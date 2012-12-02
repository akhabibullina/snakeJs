/**
 * We use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
   baseUrl: "js",
   paths: {
      "lib": "lib"
   }
});

define(['snake', 'board', 'food'], function() {

   var mySnakeBoard = new Snake.Board({
      boardContainer: "game-area",
      fullScreen: true
   });

});