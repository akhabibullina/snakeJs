/**
* The base class for the keeping the common functionality.
* @class game
*/

// todo create a 'defaults' or 'settings' object to store the options.
// todo: exclude dependencies
define(['jquery'], function ($) {

    var radius = 8;
    var side = radius * 2;
    var emittedElements = []; // contains coordinates of already emitted elements.
    var score = 0;

    // Default constructor
    Game = function () {

    }

    Game.prototype.getEmittedElements = function () {
        return emittedElements;
    }


    Game.prototype.setEmittedElements = function (newElements) {
        emittedElements = newElements;
    }

    Game.prototype.getSide = function () {
        return side;
    }

    Game.prototype.getScore = function () {
        return score;
    }

    Game.prototype.setScore = function (value) {
        score = value;
        $('#total-score span').text(score);
    }

    // Display an svg element on play board.
    Game.prototype.drawElement = function (boardParams, isSnake, el) {
        var randomCoordinates = this.getRandomPosition(boardParams);
        var el = Game.drawSvg(boardParams, randomCoordinates, isSnake);
        return el;
    }

    // Generate random x and y coordinates for a new element display.
    Game.prototype.getRandomPosition = function (limitCoordinates) {

        // If the game area has border than calculate the available field.
        var topMargin = limitCoordinates.y + parseInt(limitCoordinates.borderWidth);
        var leftMargin = limitCoordinates.x + parseInt(limitCoordinates.borderWidth);

        var rangeX = (limitCoordinates.width - leftMargin);
        var rangeY = (limitCoordinates.height - topMargin);
        var x = Math.floor(getRandomArbitary(limitCoordinates.x, limitCoordinates.width - side));
        var y = Math.floor(getRandomArbitary(limitCoordinates.y, limitCoordinates.height - side));
        return { 'x': x, 'y': y }
    }

    Game.drawSvg = function (boardParams, randomCoordinates, isSnake) {
        var paperX = boardParams.x + parseInt(boardParams.borderWidth);
        var paperY = boardParams.y + parseInt(boardParams.borderWidth);

        var paper = Raphael(paperX, paperY, boardParams.width, boardParams.height);
        var coordinates = findBestCoordinates(emittedElements, randomCoordinates);
        
        if (isSnake) {
            // Add the tail if needed.
            // todo finish it
            //var snake = Snake.prototype.getSnake();
            //if (snake != {}) {
            //    // do not use random coordinates, use SnakeX+side and SnakeY+side instead
            //    coordinates.randX = snake.node.attr.rect.x + side;
            //    coordinates.randY = snake.node.attr.rect.y + side;
            //}
            // Creates a rectangular for snake body element.
            var rect = paper.rect(coordinates.randX, coordinates.randY, side, side);
            rect.attr("fill", "#006666"); // todo: set color as constant in snake

        } else {
            // Creates circle at calculated position with given radius.
            var circle = paper.circle(coordinates.randX, coordinates.randY, radius);
            circle.attr("fill", "#f00");
            circle.attr("stroke", "#fff"); // todo: set color as constant in food
        }
        emittedElements.push({ 'x': coordinates.randX, 'y': coordinates.randY });
         return rect || circle;
    }

    // Returns a random number between min and max
    function getRandomArbitary(min, max) {
        return Math.random() * (max - min) + min;
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
        // todo fix bug Uncaught TypeError: Cannot read property 'randX' of undefined on line 84
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
