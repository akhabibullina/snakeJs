/**
* This class manages the food which firstly generated at the play board and then is eaten by the snake.
* It only shows 1 piece for a place.
* @class Food
* Contains playingBoard (the Snake.Board that this food resides in).
*/

define(['utils', 'board', 'jquery'], function (GameUtils, Board, $) {
    var food;
    var foodColor = '#f00';
    var boardParams;

    var Food = function () {
        var gameArea = document.getElementById('game-area');
        boardParams = new Board({ "board": gameArea });
        food = this.drawFood(boardParams);
    }

    Food.prototype.drawFood = function (boardParams) {
        var randomCoordinates = GameUtils.getRandomPosition(boardParams);
        return GameUtils.drawElement(boardParams, randomCoordinates, {name: 'circle', color: foodColor});
    }

    Food.prototype.getFood = function () {
        return food || {};
    }

    Food.prototype.replaceFood = function () {

        var newCoord = GameUtils.getRandomPosition(boardParams);
        // todo find another way to set cx and cy
        $('circle').attr('cx', newCoord.x);
        $('circle').attr('cy', newCoord.y);

        var currentFoodX = food.node.cx.animVal.value;
        var currentFoodY = food.node.cy.animVal.value;

        var displayedElements = GameUtils.getEmittedElements();

        $.each(displayedElements, function (i) {
            if (displayedElements[i].x === currentFoodX && displayedElements[i].y == currentFoodY) {
                displayedElements[i].x = newCoord.x;
                displayedElements[i].y = newCoord.y;
            }
        });

        GameUtils.setEmittedElements(displayedElements);
    }

    return Food;
});