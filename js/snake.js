/**
  * @module Snake
  * @class Snake
  */

// todo: differ 'snake' from 'tail'
define(['utils', 'food', 'board', 'jquery'], function (GameUtils, Food, Board, $) {
    var boardParams;
    var snakeHead, tail, snake = [];
    var snakeColor = '#006666';
    var intId = 0;
    var keyPressed = 0;
    var keyCodes = {'left': 37, 'up': 38, 'right': 39, 'down': 40};
    var speed = 500; // ms
    var side = GameUtils.getSide();
    var newPoints = 5; // increased score points

   function snakeMoveHandler(ev){
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
        boardParams = new Board({"board": gameArea});
        snakeHead = this.drawSnake(boardParams);
        snake.push(snakeHead);
        $('body').keydown(function (ev) {
           snakeMoveHandler(ev);
        });
    }

    Snake.prototype.drawSnake = function (boardParams) {
        var randomCoordinates = GameUtils.getRandomPosition(boardParams);
        return GameUtils.drawElement(boardParams, randomCoordinates,
                                    {name: 'rect', color: snakeColor});
    }

   // Add the tail if needed.
    Snake.prototype.drawTail = function () {
      var tailX, tailY;
      var snakeX = parseInt(snakeHead.node.attributes.x.nodeValue),
          snakeY = parseInt(snakeHead.node.attributes.y.nodeValue);

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
      snake.push(tail);
    }

    // Detect its movements;
    // Detect the speed;
    // If it faces food, then call eatFood()
    // If it faces boarder then reset
    Snake.prototype.moveSnake = function (ev, boardParams) {
       var isHead = true;
       var newCoordinates, prevElX, prevElY, newX, newY;
        $.each(snake, function(index, snakeEl) {
          if (isHead) {
            // Store the prev coordinates to use for tail coordinates detection.
            prevElX = snakeEl.node.x.animVal.value;
            prevElY = snakeEl.node.y.animVal.value;

            newCoordinates = Snake.prototype.calculateHeadCoordinates(ev);
            isHead = false;
         } else {
            newCoordinates = {'x': prevElX, 'y': prevElY}
         }
         newX = newCoordinates.x;
         newY = newCoordinates.y;
         Snake.prototype.animateSnake(snakeEl, newX, newY);
         Snake.prototype.handleSnakeMeetsFood(newX, newY);
         Snake.prototype.handleSnakeMeetsBorder(newX, newY, boardParams.width, boardParams.height);
      });
    }

    // todo: replace 'side' with 1 - meaning 1px per step
    Snake.prototype.calculateHeadCoordinates = function (ev) {
       var arrows, calculatedX,calculatedY;

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

        return {'x': calculatedX, 'y': calculatedY}
    }

    Snake.prototype.animateSnake = function (snakeEl, calculatedX, calculatedY) {
        var anim = Raphael.animation({x: calculatedX, y: calculatedY}, 1);
        snakeEl.animate(anim);
    }

    Snake.prototype.handleSnakeMeetsBorder = function (calculatedX, calculatedY, boardWidth, boardHeight) {
        var boardLimitLeft = 0;
        var boardLimitRight = boardWidth - side;
        var boardLimitTop = 0;
        var boardLimitBottom = boardHeight - side;
        if (calculatedX <= boardLimitLeft
         || calculatedX >= boardLimitRight
         || calculatedY <= boardLimitTop
         || calculatedY >= boardLimitBottom) {
            this.stopMoving();
            alert('Yup, you failed! Try again..');
        }
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
            this.drawTail();
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