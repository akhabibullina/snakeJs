/**
 * Use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
    baseUrl: "js",
    paths: {
        "lib": "lib",
        "jquery": "lib/jquery.min"
    //      "raphael": "lib/raphael"
    }
//   shim: {
//      'lib/raphael': {
//         exports: 'Raphael'
//      }
//   }
});

define(['board', 'food', 'snake', 'jquery'], function(Board, Food, Snake, $) {
    var gameArea = document.getElementById('game-area');
    var mySnakeBoard = new Board({
        "gamePlay" : gameArea
    });
    var mySnakeFood = new Food(document.getElementById('food'));
    var mySnake = new Snake(document.getElementById('snake'));

    $('#start-fight').click(function(){
//        $(this).attr('disabled', true);
        var playBoardCoordinates = {
            'x': mySnakeBoard.offsetX + 10,
            'y': mySnakeBoard.offsetY +10,
            'width': mySnakeBoard.width - 10,
            'height': mySnakeBoard.height - 10
            };
        mySnakeFood.drawFood(playBoardCoordinates);
        // todo: prevent snake and food were on the same cell
        // todo draw the snake with raphael
        mySnake.drawSnake(playBoardCoordinates);
    })

});