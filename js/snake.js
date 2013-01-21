/**
  * @module Snake
  * @class Snake
  */

define(['jquery'], function($) {
    Snake = function (inputData) {
        this.el = inputData;
    }
    Snake.prototype.drawSnake = function (boardParams) {
        Game.prototype.drawElement(boardParams, true);
    }

    return Snake;
});