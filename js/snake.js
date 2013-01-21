/**
  * @module Snake
  * @class Snake
  */

define(['jquery'], function($) {
    Snake = function (inputData) {
        this.el = inputData;
    }
    Snake.prototype.drawSnake = function (boardParams) {
        // todo take this code as duplicated to the parent's class
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
        var rect = paper.rect(randomCoordinates.x, randomCoordinates.y, 15, 15);
        rect.attr("fill", "#006666");
        
    }

    function getRandomPosition(limitCoordinates) {
        var rangeX = (limitCoordinates.height - limitCoordinates.x);
        var rangeY = (limitCoordinates.width - limitCoordinates.y);
        var x = Math.floor((Math.random() * rangeX) + limitCoordinates.x);
        var y = Math.floor((Math.random() * rangeY) + limitCoordinates.y);
        return { 'x': x, 'y': y }
    }

    return Snake;
});