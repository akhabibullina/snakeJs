/**
  * @module Snake
  * @class Snake
  */

define(['game', 'board', 'jquery'], function (Game, Board, $) {
    var snake;
    var speed = 1000; // ms

    Snake = function (boardParams) {
        snake = this.drawSnake(boardParams);
        $('body').keypress(function (ev) { Snake.prototype.moveSnake(ev, boardParams) });
    }

    Snake.prototype.drawSnake = function (boardParams) {
        return Game.prototype.drawElement(boardParams, true);
    }

    // Detect its movements;
    // Detect the speed;
    // If it faces food, then call eatFood()
    // If it faces boarder then reset
    Snake.prototype.moveSnake = function (ev, boardParams) {
        var anim, calculatedX, calculatedY;
        var side = Game.prototype.getSide();
        var myBoard = boardParams;

        var boardX = myBoard.x;
        var boardY = myBoard.y;
        var boardHeight = myBoard.height;
        var boardWidth = myBoard.width;
        var boardBorderWidth = myBoard.borderWidth;


        arrows = ((ev.which) || (ev.keyCode));

        switch (arrows) {

            case 37: // left arrow
                calculatedX = snake.attrs.x - (snake.attrs.width)/2;
                calculatedY = snake.attrs.y;
                break;

            case 38: // up arrow
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y - (snake.attrs.height)/2;
                break;

            case 39: // right arrow
                calculatedX = snake.attrs.x + (snake.attrs.width)/2;
                calculatedY = snake.attrs.y;
                break;

            case 40: // down arrow
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y + (snake.attrs.height)/2;
                break;
        }
        // todo: re-calculate the borders
        if (   calculatedX <= boardX + boardBorderWidth // left
            || calculatedX >= boardX + boardBorderWidth + boardWidth - side// right
            || calculatedY <= boardY + boardBorderWidth // top
            || calculatedY >= boardY + boardBorderWidth + boardHeight - side) { // bottom
            alert('epic fail you bro');
        }
        anim = Raphael.animation({ x: calculatedX, y: calculatedY }, speed);
        snake.animate(anim);

    }

    Snake.prototype.eatFood = function () {
        // Inform food it is eaten and shouldn't be shown no longer;
        // Increase the tail length.
        // Speed up the snake.
    }

    Snake.prototype.increaseSpeed = function () {
        speed += 50;
    }

    return Snake;
});