/**
* This class manages the food which firstly generated at the play board and then is eaten by the snake.
* It only shows 1 piece for a place.
* @class Food
* Contains playingBoard (the Snake.Board that this food resides in).
*/

define(['utils', 'board', 'jquery'], function(GameUtils, Board, $) {
    var food;
    var foodColor = '#f00';
    var boardParams;

    // instance of the singleton
    var singletonInstance = null;

    var Food = function() {

        // Get the instance of the SingletonClass
        // If there is no instance in this.singletonInstance, instanciate one
        Food.getInstance = function() {
            if (!singletonInstance) {
                // create a instance
                singletonInstance = createInstance();
            }

            // return the instance of the singletonClass
            return singletonInstance;
        }

        // function for the creation of the SingletonClass class
        var createInstance = function() {
            var board = Board.getInstance();
            singletonInstance = food = drawFood(board);
            return singletonInstance;
        }

        Food.getFood = function() {
            return food || {};
        }

        drawFood = function(boardParams) {
            var randomCoordinates = GameUtils.getRandomPosition(boardParams);
            return GameUtils.drawElement(boardParams, randomCoordinates, {name: 'circle', color: foodColor});
        }

        Food.replaceFood = function() {
            var board = Board.getInstance();
            var newCoord = GameUtils.getRandomPosition(board);
            // todo find another way to set cx and cy
            $('circle').attr('cx', newCoord.x);
            $('circle').attr('cy', newCoord.y);

            var currentFoodX = food.node.cx.animVal.value;
            var currentFoodY = food.node.cy.animVal.value;

            var displayedElements = GameUtils.getEmittedElements();

            $.each(displayedElements, function(i) {
                if (displayedElements[i].x === currentFoodX && displayedElements[i].y == currentFoodY) {
                    displayedElements[i].x = newCoord.x;
                    displayedElements[i].y = newCoord.y;
                }
            });

            GameUtils.setEmittedElements(displayedElements);
        }

        Food.prototype.destroy = function() {
            document.body.removeChild(food);
        }
        // public methodes
        return {
            getInstance: Food.getInstance,
            getFood: Food.getFood,
            replaceFood: Food.replaceFood
        }
    }

    return Food();
});