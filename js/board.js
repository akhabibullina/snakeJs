/**
* This class manages playing board for the game.
* @class Board
*/
define(['jquery'], function($) {

    Board = function (inputData) {
//    if (inputData.gamePlay.getContext) {
//       this.drawBoardCanvas(inputData.gamePlay.getContext('2d'));
//    }
    this.offsetX = inputData.gamePlay.offsetTop;
    this.offsetY = inputData.gamePlay.offsetLeft;
    this.width = inputData.gamePlay.clientWidth;
    this.height = inputData.gamePlay.clientHeight;
    // add listener to button
    // todo: take food related code to food
    }

    // If canvas is provided
    Board.prototype.drawBoardCanvas = function(gamePlayCtx) {
       gamePlayCtx.fillRect(0,0,300,300);
       gamePlayCtx.clearRect(10,10,280,130);
    }

    return Board;
});
