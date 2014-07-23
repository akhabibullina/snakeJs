/**
 * This class manages playing board for the game.
 * @class Board
 */

define([], function() {
  var gamePlayElement = document.getElementById('game-area');
  var paper = Raphael(gamePlayElement, gamePlayElement.clientWidth, gamePlayElement.clientHeight);

  // Constructor
  var Board = function() {

    // instance of the singleton
   var singletonInstance = null;

    // Get the instance of the SingletonClass
    // If there is no instance in this.singletonInstance, instanciate one
    Board.getInstance = function() {
      if (!singletonInstance) {
        // create a instance
        singletonInstance = createInstance();
      }

      // return the instance of the singletonClass
      return singletonInstance;
    }

    // function for the creation of the SingletonClass class
    var createInstance = function() {
      singletonInstance = {
        'x': gamePlayElement.offsetTop,
        'y': gamePlayElement.offsetLeft,
        'width': gamePlayElement.clientWidth,
        'height': gamePlayElement.clientHeight,
        'borderWidth': 0, //gamePlayElement.clientLeft
        'paper': paper
      };
      return singletonInstance;
    }
    // public methods
    return {
      getInstance: Board.getInstance
    }
  }
  return Board();
});