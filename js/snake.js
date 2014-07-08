/**
  * @module Snake
  * @class Snake
  */

// todo: differ 'snake' from 'tail'
define(['utils', 'food', 'board', 'jquery'], function (GameUtils, Food, Board, $) {
    var boardParams;
    var snakeHead, tail, snake = [];
    var snakeColor = { 'head': '#006666', 'tail': '#006600' };
    var intId = 0;
    var keyPressed = 0;
    var keyCodes = { 'left': 37, 'up': 38, 'right': 39, 'down': 40 };
    var speed = 500; // ms
    var side = GameUtils.getSide();
    var newPoints = 5; // increased score points

    function snakeMoveHandler(ev) {
        var isDifferentKeyPressed = keyPressed !== ((ev.which) || (ev.keyCode));
        if (isDifferentKeyPressed) {
            clearInterval(intId);
            intId = setInterval(function () {
                Snake.prototype.moveSnake(ev, boardParams)
            }, speed);
        }
    }

    // Constructor
    var Snake = function () {
        var gameArea = document.getElementById('game-area');
        boardParams = new Board({ "board": gameArea });
        this.drawSnakeHead(boardParams);
        $('body').keydown(function (ev) {
            snakeMoveHandler(ev);
        });
    }

    Snake.prototype.drawSnakeHead = function (boardParams) {
        var randomCoordinates = GameUtils.getRandomPosition(boardParams);
        snakeHead = GameUtils.drawElement(boardParams, randomCoordinates, { name: 'rect', color: snakeColor.head });
        snake.push(snakeHead);
    }

    // Add the tail if needed.
    Snake.prototype.drawSnakeTail = function () {
        var snakeHeadNode = snakeHead.node.attributes;
        var coordinates = { 'x': parseInt(snakeHeadNode.x.nodeValue), 'y': parseInt(snakeHeadNode.y.nodeValue) };
        var tail = GameUtils.drawElement(boardParams, coordinates, { name: 'rect', color: snakeColor.tail });
        snake.push(tail);
    }

    // Detect its movements;
    // Detect the speed;
    // If it faces food, then call eatFood()
    // If it faces boarder then reset
    Snake.prototype.moveSnake = function (ev, boardParams) {
        var isHead = true;
        var newCoordinates, newX, newY;
        // Deep copy of the object
        var snakeBody = jQuery.extend(true, {}, snake);
        var currentElIndex = 1;
        $.each(snakeBody, function (index, snakeEl) {
            if (isHead) {
                newCoordinates = Snake.prototype.calculateHeadNewCoordinates(ev);
            } else {
                var prevNode = snakeBody[currentElIndex - 1].node;
                newCoordinates = { 'x': prevNode.x.animVal.value, 'y': prevNode.y.animVal.value }
                currentElIndex++;
            }
            newX = newCoordinates.x;
            newY = newCoordinates.y;
            Snake.prototype.animateSnake(snakeEl, newX, newY);
            if (isHead) {
                Snake.prototype.handleSnakeMeetsFood(newX, newY);
                Snake.prototype.handleSnakeMeetsBorder(newX, newY, boardParams.width, boardParams.height);
                isHead = false;
            }
        });
    }

    Snake.prototype.animateSnake = function (snakeEl, calculatedX, calculatedY) {
        var anim = Raphael.animation({ x: calculatedX, y: calculatedY }, 1);
        snakeEl.animate(anim);
    }

    Snake.prototype.calculateHeadNewCoordinates = function (ev) {
        var arrows, calculatedX, calculatedY;

        arrows = ((ev.which) || (ev.keyCode));

        switch (arrows) {
            case keyCodes.left:
                keyPressed = keyCodes.left;
                calculatedX = snakeHead.attrs.x - side;
                calculatedY = snakeHead.attrs.y;
                break;

            case keyCodes.up:
                keyPressed = keyCodes.up;
                calculatedX = snakeHead.attrs.x;
                calculatedY = snakeHead.attrs.y - side;
                break;

            case keyCodes.right:
                keyPressed = keyCodes.right;
                calculatedX = snakeHead.attrs.x + side;
                calculatedY = snakeHead.attrs.y;
                break;

            case keyCodes.down:
                keyPressed = keyCodes.down;
                calculatedX = snakeHead.attrs.x;
                calculatedY = snakeHead.attrs.y + side;
                break;
        }

        return { 'x': calculatedX, 'y': calculatedY }
    }

    Snake.prototype.handleSnakeMeetsBorder = function (calculatedX, calculatedY, boardWidth, boardHeight) {
        var boardLimitLeft = 0,
            boardLimitTop  = 0,
            boardLimitRight = boardWidth - side,
            boardLimitBottom = boardHeight - side;
        if (calculatedX <= boardLimitLeft || calculatedX >= boardLimitRight
         || calculatedY <= boardLimitTop  || calculatedY >= boardLimitBottom) {
            this.stopMoving();
            alert('Game Over!');
        }
    }

    Snake.prototype.handleSnakeMeetsFood = function (snakeX, snakeY) {
        food = Food.prototype.getFood();
        var foodX = food.node.cx.animVal.value,
            foodY = food.node.cy.animVal.value;

        if ((snakeX + side >= foodX && snakeX <= foodX)
         && (snakeY + side >= foodY && snakeY <= foodY)) {
            Food.prototype.replaceFood();
            this.drawSnakeTail();
            this.increaseScore();
            this.increaseSpeed();
        }
    }

    Snake.prototype.stopMoving = function () {
        clearInterval(intId);
        $('body').unbind('keydown');
    }

    Snake.prototype.increaseScore = function () {
        var currentScore = GameUtils.getScore();
        GameUtils.setScore(currentScore + newPoints);
    }

    Snake.prototype.increaseSpeed = function () {
        speed -= 100;
    }

    return Snake;
});