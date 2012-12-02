/**
* This class manages playing board for the game.
* @class Board
*/
define(['jquery'], function($) {

    Board = function (inputData) {
    var that = this;
    if (inputData.gamePlay.getContext) {
       this.drawBoard(inputData.gamePlay.getContext('2d'));
    }
    this.offsetX = inputData.gamePlay.offsetTop;
    this.offsetY = inputData.gamePlay.offsetLeft;
    this.width = inputData.gamePlay.width;
    this.height = inputData.gamePlay.height;
    // add listener to button
    $('#start-fight').click(function(){
       that.drawFood({'x': that.offsetX, 'y': that.offsetY,
                      'width': that.width, 'height': that.height});
    });
    }

    Board.prototype.drawBoard = function (gamePlayCtx) {
      gamePlayCtx.fillRect(0,0,300,300);
      gamePlayCtx.clearRect(10,10,280,130);
    }

    Board.prototype.drawFood = function (boardParams) {
       var randomCoordinates = getRandomPosition(boardParams);
       // draw food
    }

    function getRandomPosition(limitCoordinates) {
       var x = Math.floor((Math.random()*(limitCoordinates.height+limitCoordinates.x))+limitCoordinates.x);
       var y = Math.floor((Math.random()*(limitCoordinates.width+limitCoordinates.y))+limitCoordinates.y);
       return {'x': x, 'y': y}
    }
    // and return an object
    return Board;
});
