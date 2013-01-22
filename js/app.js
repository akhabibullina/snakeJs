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

    // todo: divs, canvas and raphael approached will be implemented, separate them or add appropriate settings.
    define(['board', 'food', 'snake', 'jquery'], function(Board, Food, Snake, $) {
        var gameArea = document.getElementById('game-area');
        var mySnakeBoard = new Board({ "gamePlay": gameArea });

        $('#start-fight').click(function(){
            // $(this).attr('disabled', true);
            var playBoardCoordinates = {
                'x': mySnakeBoard.offsetX + 10, // top margin + border
                'y': mySnakeBoard.offsetY + 10, // left margin + border
                'width': mySnakeBoard.width,
                'height': mySnakeBoard.height
            };

            var mySnake = new Snake(playBoardCoordinates);
            var mySnakeFood = new Food(playBoardCoordinates);
        })

        $('#stop-fight').click(function () {
            // Reset the play board.
        })

});