/**
* This class manages the food which firstly generated at the play board and then is eaten by the snake.
* It only shows 1 piece for a place.
* @class Food
* Contains playingBoard (the Snake.Board that this food resides in).
*/

define(['game', 'jquery'], function (Game, $) {
    var food;

    Food = function (boardParams) {
        food = this.drawFood(boardParams);
    }

    Food.prototype.drawFood = function (boardParams) {
        return  Game.prototype.drawElement(boardParams);
    }

    Food.prototype.getFood = function () {
        return food || {};
    }

    Food.prototype.eraseFood = function (food) {
        // console.log(food);
        // Clear the piece and generate a new one
    }

    return Food;
});