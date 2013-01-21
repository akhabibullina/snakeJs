/**
* The base class for the keeping the common functionality.
* @class game
*/
define(['jquery'], function ($) {

    Game = function () {

    }

    Game.prototype.drawElement = function (boardParams, isSnake, el) {
        // todo maybe take this code as duplicated to the parent's class
        var randomCoordinates = this.getRandomPosition(boardParams);

        if (el) {
            Game.drawDiv(randomCoordinates, el, isSnake);
        } else {
            Game.drawSvg(boardParams, randomCoordinates, isSnake);
        }
    }

    Game.prototype.getRandomPosition = function (limitCoordinates) {
        var rangeX = (limitCoordinates.width - limitCoordinates.x);
        var rangeY = (limitCoordinates.height - limitCoordinates.y);
        var x = Math.floor((Math.random() * rangeX) + limitCoordinates.x +10);
        var y = Math.floor((Math.random() * rangeY) + limitCoordinates.y +10);
        return { 'x': x, 'y': y }
    }

    Game.drawDiv = function (randomCoordinates, el, isSnake) {
        $(el).css('position', 'absolute')
          .css('top', randomCoordinates.x)
          .css('left', randomCoordinates.y)
          .css('visibility', 'visible');
    }

    Game.drawSvg = function (boardParams, randomCoordinates, isSnake) {
        var paper = Raphael(0, 0, boardParams.width + boardParams.x, boardParams.height + boardParams.y);

        if (isSnake) {
            // Creates circle at calculated position with radius 10
            var circle = paper.circle(randomCoordinates.x, randomCoordinates.y, 8);
            circle.attr("fill", "#f00");
            circle.attr("stroke", "#fff");
        } else {
            // Creates a rectangular for snake body element.
            console.log("x: " + randomCoordinates.x); console.log("y: " + randomCoordinates.y);
            var rect = paper.rect(randomCoordinates.x, randomCoordinates.y, 15, 15);
            rect.attr("fill", "#006666");
        }
    }


    return Game;
});
