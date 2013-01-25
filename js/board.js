/**
* This class manages playing board for the game.
* @class Board
*/

define([], function () {

    // Constructor
    var Board = function (gamePlayData) {
        this.x = gamePlayData.board.offsetTop;
        this.y = gamePlayData.board.offsetLeft;
        this.width  = gamePlayData.board.clientWidth;
        this.height = gamePlayData.board.clientHeight;
        this.borderWidth = gamePlayData.board.clientLeft;
    }

    return Board;
});
