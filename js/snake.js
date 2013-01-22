/**
  * @module Snake
  * @class Snake
  */

define(['game', 'jquery'], function (Game, $) {
    var snake;

    Snake = function (boardParams) {
        snake = this.drawSnake(boardParams);
        $('body').keypress(this.moveSnake);
    }

    Snake.prototype.drawSnake = function (boardParams) {
        return Game.prototype.drawElement(boardParams, true);
    }

    // Detect its movements;
    // Detect the speed;
    // If it faces food, then call eatFood()
    // If it faces boarder then reset
    Snake.prototype.moveSnake = function (ev) {
        var anim, calculatedX, calculatedY;

        arrows = ((ev.which) || (ev.keyCode));

        switch (arrows) {

            case 37: // left arrow
                calculatedX = snake.attrs.x - snake.attrs.width;
                calculatedY = snake.attrs.y;
                break;

            case 38: // up arrow
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y - snake.attrs.height;
                break;

            case 39: // right arrow
                calculatedX = snake.attrs.x + snake.attrs.width;
                calculatedY = snake.attrs.y;
                break;

            case 40: // down arrow
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y + snake.attrs.height;
                break;
        }
        anim = Raphael.animation({ x: calculatedX, y: calculatedY }, 2e3);
        snake.animate(anim);

    }

    Snake.prototype.eatFood = function () {
        // Inform food it is eaten and shouldn't be shown no longer;
        // Increase the tail length.
    }

    return Snake;
});