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

        if (this.el) {
            drawDiv(randomCoordinates);
        } else {
            drawSvg(randomCoordinates);
        }
    }

    function drawDiv(randomCoordinates) {
        $(this.el).css('position', 'absolute')
                  .css('top', randomCoordinates.x)
                  .css('left', randomCoordinates.y)
                  .css('visibility', 'visible');
    }

    function drawSvg(randomCoordinates) {
        // Creates canvas 59 × 290 at 35, 35 according to board's size
        var paper = Raphael(35, 35, 590, 290);

        // Creates circle at calculated position with radius 10
        var circle = paper.circle(randomCoordinates.x, randomCoordinates.y, 8);

        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        circle.attr("stroke", "#fff");
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