/**
* The base class for the keeping the common functionality.
* @class game
*/
define(['jquery'], function ($) {

    var radius = 8;
    var side = radius * 2;
    var emittedElements = []; // contains coordinates of already emitted elements.

    Game = function () {

    }

    // Display an svg element on play board.
    Game.prototype.drawElement = function (boardParams, isSnake, el) {
        // todo maybe take this code as duplicated to the parent's class
        var randomCoordinates = this.getRandomPosition(boardParams);
        var el = Game.drawSvg(boardParams, randomCoordinates, isSnake);
        return el;
    }

    // Generate random x and y coordinates for a new element display.
    Game.prototype.getRandomPosition = function (limitCoordinates) {
        var rangeX = (limitCoordinates.width - limitCoordinates.x);
        var rangeY = (limitCoordinates.height - limitCoordinates.y);
        var x = Math.floor((Math.random() * rangeX) + limitCoordinates.x +10);
        var y = Math.floor((Math.random() * rangeY) + limitCoordinates.y +10);
        return { 'x': x, 'y': y }
    }

    Game.drawSvg = function (boardParams, randomCoordinates, isSnake) {
        var paper = Raphael(0, 0, boardParams.width + boardParams.x, boardParams.height + boardParams.y);
        var coordinates = findBestCoordinates(emittedElements, randomCoordinates);
        
        if (isSnake) {
            // todo: Add the tail if needed.
            // Creates a rectangular for snake body element.
            var rect = paper.rect(coordinates.randX, coordinates.randY, side, side);
            rect.attr("fill", "#006666");

        } else {
            // Creates circle at calculated position with given radius.
            var circle = paper.circle(coordinates.randX, coordinates.randY, radius);
            circle.attr("fill", "#f00");
            circle.attr("stroke", "#fff");
        }
        emittedElements.push({ 'x': coordinates.randX, 'y': coordinates.randY });
         return rect || circle;
    }

    // Check if there are any svg elements drawn, don't overlap them.
    // todo: test something is wrong with it.
    function findBestCoordinates(emittedElements, randomCoordinates) {
        var x, y;
        var randX = randomCoordinates.x,
            randY = randomCoordinates.y;
        // If an empty array then skip the rest of the check.
        if (!emittedElements.length) {
            return { 'randX': randX, 'randY': randY };
        }
        // Otherwise, make sure the new element will not overlap the existing one.
        for (el in emittedElements) {
            x = emittedElements[el].x;
            y = emittedElements[el].y;
            if (randX > x && randX < x + side) {
                randX += side;
                findBestCoordinates(emittedElements, { 'x': randX, 'y': randY });
            } else if (randY > y && randY < y + side) {
                randY += side;
                findBestCoordinates(emittedElements, { 'x': randX, 'y': randY });
            } else {
                return { 'randX': randX, 'randY': randY };
            }
        }
    }

    return Game;
});
