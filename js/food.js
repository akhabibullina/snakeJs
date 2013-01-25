/**
* This class manages the food which firstly generated at the play board and then is eaten by the snake.
* It only shows 1 piece for a place.
* @class Food
* Contains playingBoard (the Snake.Board that this food resides in).
*/

define(['game', 'jquery'], function (Game, $) {
    var food;
    var bp;

    Food = function (boardParams) {
        bp = boardParams;
        food = this.drawFood(boardParams);
    }

    Food.prototype.drawFood = function (boardParams) {
        return  Game.prototype.drawElement(boardParams);
    }

    Food.prototype.getFood = function () {
        return food || {};
    }

    Food.prototype.replaceFood = function () {

        var newCoord = Game.prototype.getRandomPosition(bp);
        // todo find another way to set cx and cy
        $('circle').attr('cx', newCoord.x);
        $('circle').attr('cy', newCoord.y);

        var currentFoodX = food.node.cx.animVal.value;
        var currentFoodY = food.node.cy.animVal.value;

        var displayedElements = Game.prototype.getEmittedElements();

        // No longer store the coordinates in the array.
        $.each(displayedElements, function (i) {
            if (displayedElements[i].x === currentFoodX && displayedElements[i].y == currentFoodY) {
                displayedElements[i].x = newCoord.x;
                displayedElements[i].y = newCoord.y;
            }
        });

        Game.prototype.setEmittedElements(displayedElements);
    }

    return Food;
});