/**
  * @module Snake
  * @class Snake
  */

define(['game', 'board', 'food', 'jquery'], function (Game, Board, Food, $) {
    var snake;
    var intId = 0;
    var keyPressed = 0;
    var speed = 500; // ms
    var side = Game.prototype.getSide() + 1; // 1 stand for the snake border
    var newPoints = 5;

    Snake = function (boardParams) {
        snake = this.drawSnake(boardParams);
        i = 0;
        $('body').keydown(function (ev) {
            // Clear last handler if the key is different.
			
            if (keyPressed !== ((ev.which) || (ev.keyCode))) {
			console.log('keyPressed '+keyPressed);
			console.log('new key '+((ev.which) || (ev.keyCode)));
                clearInterval(intId);
                intId = setInterval(function () {
                    Snake.prototype.moveSnake(ev, boardParams)
                }, 100);
            }
        });
    }

    //Snake.prototype.getSnake() = function () {
    //    return snake || {}
    //}

    Snake.prototype.drawSnake = function (boardParams) {
        return Game.prototype.drawElement(boardParams, true);
    }

    // Detect its movements;
    // Detect the speed;
    // If it faces food, then call eatFood()
    // If it faces boarder then reset
    Snake.prototype.moveSnake = function (ev, boardParams) {
        var calculatedCoordinates = Snake.prototype.calculateCoordinates(ev);
        var calculatedX = calculatedCoordinates.x;
        var calculatedY = calculatedCoordinates.y;

        this.animateSnake(calculatedX, calculatedY);
        this.handleSnakeMeetsFood(calculatedX, calculatedY);
        this.handleSnakeMeetsBorder(calculatedX, calculatedY, boardParams.width, boardParams.height);

    }

    // todo: replace 'side' with 1 - meaning 1px per step
    Snake.prototype.calculateCoordinates = function (ev) {
        arrows = ((ev.which) || (ev.keyCode));

        switch (arrows) {
            case 37: // left arrow
                keyPressed = 37;
                calculatedX = snake.attrs.x - side;
                calculatedY = snake.attrs.y;
                break;

            case 38: // up arrow
				keyPressed = 38;
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y - side;
                break;

            case 39: // right arrow
				keyPressed = 39;
                calculatedX = snake.attrs.x + side;
                calculatedY = snake.attrs.y;
                break;

            case 40: // down arrow
				keyPressed = 40;
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y + side;
                break;
        }

        return { 'x': calculatedX, 'y': calculatedY }
    }

    Snake.prototype.animateSnake = function (calculatedX, calculatedY) {
        var anim = Raphael.animation({ x: calculatedX, y: calculatedY }, speed);
        snake.animate(anim);
    }

    Snake.prototype.handleSnakeMeetsBorder = function (calculatedX, calculatedY, boardWidth, boardHeight) {
        var boardLimitLeft = 0;
        var boardLimitRight = boardWidth - side;
        var boardLimitTop = 0;
        var boardLimitBottom = boardHeight - side;
        if (calculatedX < boardLimitLeft
         || calculatedX > boardLimitRight
         || calculatedY < boardLimitTop
         || calculatedY > boardLimitBottom) {
            this.stopMove();
        }
    }

    Snake.prototype.stopMove = function () {
        alert('Yup, you failed!');
        clearInterval(intId);
        $('body').unbind('keypress');
    }

    Snake.prototype.handleSnakeMeetsFood = function (snakeX, snakeY) {
        food = Food.prototype.getFood();
        var foodX = food.node.cx.animVal.value;
        var foodY = food.node.cy.animVal.value;

        // todo side should be related to radius
        // todo check why right and bottom coming doesn't work
        if ((snakeX + side/2 >= foodX && snakeX <= foodX)
         && (snakeY + side/2 >= foodY && snakeY <= foodY)) {
            alert(1);
            this.stopMove();
            //Food.prototype.eraseFood(food);
            //this.increaseTail();
            //this.increaseScore();
            //this.increaseSpeed();
        }
    }

    Snake.prototype.increaseTail = function () {
        this.drawSnake();
    }

    Snake.prototype.increaseScore = function () {
        var currentScore = Game.prototype.getScore();
        Game.prototype.setScore(currentScore + newPoints);
    }

    Snake.prototype.increaseSpeed = function () {
        speed -= 10;
    }

    return Snake;
});