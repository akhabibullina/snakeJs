/**
* This class manages playing board for the game.
* @class Board
*/

define(['jquery'], function ($) {

    // Init
    Board = function (inputData) {
        //    if (inputData.gamePlay.getContext) {
        //       this.drawBoardCanvas(inputData.gamePlay.getContext('2d'));
        //    }
        this.x = inputData.gamePlay.offsetTop;
        this.y = inputData.gamePlay.offsetLeft;
        this.width = inputData.gamePlay.clientWidth;
        this.height = inputData.gamePlay.clientHeight;
        this.borderWidth = inputData.gamePlay.clientLeft;
    }

    // If canvas is provided
    /*
    Board.prototype.drawBoardCanvas = function(gamePlayCtx) {
       gamePlayCtx.fillRect(0,0,300,300);
       gamePlayCtx.clearRect(10,10,280,130);
    }
    */

    return Board;
});
