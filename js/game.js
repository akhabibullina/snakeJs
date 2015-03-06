/**
* The base class for the keeping the common functionality.
* @class game
*/

// todo create a 'defaults' or 'settings' object to store the options.
// todo: exclude dependencies
define(['snake', 'food', 'board', 'jquery'], function (Snake, Food, Board) {

    // Default constructor
    Game = function () {
      var Game = {
      'board': Board.getInstance(),
      'snake': Snake.getInstance(),
      'food':  Food.getInstance(),
      'score': 0
      }
      return Game;
    }

    Game.prototype.score = function() {
        // todo: implement
    }

    Game.prototype.speed = function() {
        // todo: implement
    }

    Game.prototype.stop = function () {
        this.snake.prototype.destroy();
        this.food.prototype.destroy();
    }

    Game.prototype.pause = function () {
        // this.snake.prototype.stopMoving();
        // this.food.prototype.destroy();
    }
    return Game;
});
