/**
* This class manages the food which the snake will eat. It only shows 1 piece for a place.
* @class Food
* Contains playingBoard (the Snake.Board that this food resides in).
*/

define(['jquery'], function($) {
    Food = function (inputData) {
        this.el = inputData;
    }

    Food.prototype.drawFood = function (boardParams) {
       // todo maybe take this code as duplicated to the parent's class
       var randomCoordinates = getRandomPosition(boardParams);
       $(this.el).css('position', 'absolute')
                 .css('top', randomCoordinates.x)
                 .css('left', randomCoordinates.y)
                 .css('visibility', 'visible');
    }

    function getRandomPosition(limitCoordinates) {
        var rangeX = (limitCoordinates.height - limitCoordinates.x);
        var rangeY = (limitCoordinates.width  - limitCoordinates.y);
        var x = Math.floor((Math.random() * rangeX) + limitCoordinates.x);
        var y = Math.floor((Math.random() * rangeY) + limitCoordinates.y);
       return {'x': x, 'y': y}
    }

    return Food;
});