/**
  * @module Snake
  * @class Snake
  */

define(['utils', 'food', 'board', 'jquery'], function (GameUtils, Food, Board, $) {
    var boardParams;
    var snake;
    var snakeColor = '#006666';
    var intId = 0;
    var keyPressed = 0;
    var keyCodes = {'left': 37, 'up': 38, 'right': 39, 'down': 40};
    var speed = 500; // ms
    var side = GameUtils.getSide();
    var newPoints = 5; // increased score points

    // Constructor
    var Snake = function () {
        var gameArea = document.getElementById('game-area');
        boardParams = new Board({"board": gameArea});
        snake = this.drawSnake(boardParams);
        $('body').keydown(function (ev) {
            var isDifferentKeyPressed = keyPressed !== ((ev.which) || (ev.keyCode));
            if (isDifferentKeyPressed) {
            //console.log('keyPressed '+keyPressed);
            //console.log('new key '+((ev.which) || (ev.keyCode)));
                clearInterval(intId);
                intId = setInterval(function () {
                    Snake.prototype.moveSnake(ev, boardParams)
                }, speed);
            }
        });
    }

    Snake.prototype.drawSnake = function (boardParams) {
        var randomCoordinates = GameUtils.getRandomPosition(boardParams);
        return GameUtils.drawElement(boardParams, randomCoordinates,
                                    {name: 'rect', color: snakeColor});
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
            case keyCodes.left:
                keyPressed = keyCodes.left;
                calculatedX = snake.attrs.x - side;
                calculatedY = snake.attrs.y;
                break;

            case keyCodes.up:
                keyPressed = keyCodes.up;
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y - side;
                break;

            case keyCodes.right:
                keyPressed = keyCodes.right;
                calculatedX = snake.attrs.x + side;
                calculatedY = snake.attrs.y;
                break;

            case keyCodes.down:
                keyPressed = keyCodes.down;
                calculatedX = snake.attrs.x;
                calculatedY = snake.attrs.y + side;
                break;
        }

        return {'x': calculatedX, 'y': calculatedY}
    }

    Snake.prototype.animateSnake = function (calculatedX, calculatedY) {
        var anim = Raphael.animation({x: calculatedX, y: calculatedY}, 1);
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
            this.stopMoving();
            alert('Yup, you failed! Try again..');
        }
    }

    Snake.prototype.stopMoving = function () {
        clearInterval(intId);
        $('body').unbind('keydown');
    }

    Snake.prototype.handleSnakeMeetsFood = function (snakeX, snakeY) {
        food = Food.prototype.getFood();
        var foodX = food.node.cx.animVal.value;
        var foodY = food.node.cy.animVal.value;

        // todo side should be related to radius
        if ((snakeX + side >= foodX && snakeX <= foodX)
         && (snakeY + side >= foodY && snakeY <= foodY)) {
            console.log('scary snake eats nice food');
            Food.prototype.replaceFood();
            this.increaseTail();
            this.increaseScore();
            this.increaseSpeed();
        }
    }

   // Add the tail if needed.
    Snake.prototype.increaseTail = function () {
      var tailX, tailY;
      var snakeX = parseInt(snake.node.attributes.x.nodeValue),
          snakeY = parseInt(snake.node.attributes.y.nodeValue);

      switch (keyPressed) {
         case keyCodes.left:
            tailX = snakeX + side;
            tailY = snakeY;
            break;
         case keyCodes.up:
            tailX = snakeX;
            tailY = snakeY + side;
            break;
         case keyCodes.right:
            tailX = snakeX - side;
            tailY = snakeY;
            break;
         case keyCodes.down:
            tailX = snakeX;
            tailY = snakeY - side;
            break;
      }
      var coordinates = {'x': tailX, 'y': tailY};
      var tail = GameUtils.drawElement(boardParams, coordinates, {name: 'rect', color: 'red'});
      tail.animateWith(snake);
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