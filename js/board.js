/**
 * This class manages playing board for the game.
 * @class Board
 */

define([], function() {
  var gamePlayData = document.getElementById('game-area');

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
        'x': gamePlayData.offsetTop,
        'y': gamePlayData.offsetLeft,
        'width': gamePlayData.clientWidth,
        'height': gamePlayData.clientHeight,
        'borderWidth': gamePlayData.clientLeft
      };
      return singletonInstance;
    }
      // public methodes
    return {
      getInstance: Board.getInstance
    }
  }
  return Board();
});