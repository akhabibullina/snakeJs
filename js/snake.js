/**
  * @module Snake
  * @class Snake
  */

define(['jquery'], function($) {
    Snake = function (inputData) {
        this.el = inputData;
    }
    Snake.prototype.drawSnake = function (boardParams) {
        // todo maybe take this code as duplicated to the parent's class
       var randomCoordinates = getRandomPosition(boardParams);
       $(this.el).css('position', 'absolute')
                 .css('top', randomCoordinates.x)
                 .css('left', randomCoordinates.y)
                 .css('visibility', 'visible');
    }

    function getRandomPosition(limitCoordinates) {
       var x = Math.floor((Math.random()*(limitCoordinates.height)));
       var y = Math.floor((Math.random()*(limitCoordinates.width)));
       return {'x': x, 'y': y}
    }

    return Snake;
});