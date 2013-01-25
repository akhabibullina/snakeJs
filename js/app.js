/**
 * Use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
    baseUrl: "js",
    paths: {
        "lib": "lib",
        "jquery": "lib/jquery.min",
//        "raphael": "lib/raphael.min"
    }
//   shim: {
//      'lib/raphael': {
//         exports: 'Raphael'
//      }
//   }
});

    // todo: divs, canvas and raphael approaches will be implemented, separate them or add appropriate settings.
    define(['board', 'game', 'food', 'snake', 'jquery'], function(Board, Game, Food, Snake, $) {
        var gameArea = document.getElementById('game-area');
        var myBoard = new Board({ "gamePlay": gameArea });

        $('#start-fight').click(function(){
            // $(this).attr('disabled', true);
            $('#stop-fight').removeAttr('disabled');
            var style = document.defaultView.getComputedStyle(gameArea, null);
            var borderWidth = parseInt(style.getPropertyValue('border-top-width')); // the same value for each side.
            var mySnake = new Snake(myBoard);
            var myFood = new Food(myBoard);
            $('#total-score').show();
        })

        $('#stop-fight').click(function () {
            Snake.prototype.stopMoving();
        })

});