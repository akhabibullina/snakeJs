/**
* The utils class for the keeping the common functionality.
* @class 
*/

// todo create a 'defaults' or 'settings' object to store the options.
// todo: exclude dependencies
define(['jquery'], function ($) {

    var radius = 8;
    var side = radius * 2 +1; // 1 stands for border
    // var defaultColor = '';
    var emittedElements = []; // contains coordinates of already emitted elements.
    var score = 0;

    var GameUtils = {
       getEmittedElements: function () {
          return emittedElements;
       },
       setEmittedElements: function (newElements) {
          emittedElements = newElements;
       },
       getSide: function () {
          return side;
       },
       setSide: function (value) {
          side = value;
       },
       getScore: function () {
          return score;
       },
       setScore: function (value) {
           score = value;
           $('#total-score span').text(score);
       },
       // Generate random x and y coordinates for a new element display.
       getRandomPosition: function (limitCoordinates) {
            // If the game area has border than calculate the available field.
            var minX = 0,
                maxX = limitCoordinates.width - side,
                minY = 0,
                maxY = limitCoordinates.height - side;
            var x = Math.floor(this.getRandomArbitary(minX, maxX));
            var y = Math.floor(this.getRandomArbitary(minY, maxY));
            return { 'x': x, 'y': y }
       },
       // Returns a random number between min and max
       getRandomArbitary: function (min, max) {
          return Math.random() * (max - min) + min;
       },
       // Check if there are any svg elements drawn, don't overlap them.
       // todo: test something is wrong with it.
       findBestCoordinates: function (emittedElements, randomCoordinates) {
        var x, y;
        var randX = randomCoordinates.x,
            randY = randomCoordinates.y;
        // If an empty array then consider the 1st element is being drawn, skip the rest of the function.
        if (!emittedElements.length) {
            return { 'randX': randX, 'randY': randY };
        }
        // Otherwise, make sure the new element will not overlap the existing ones.
        // todo fix bug Uncaught TypeError: Cannot read property 'randX' of undefined
        for (var el in emittedElements) {
            x = emittedElements[el].x;
            y = emittedElements[el].y;
            if ( randX > x && randX < x + side ) {
                randX += side;
                this.findBestCoordinates(emittedElements, { 'x': randX, 'y': randY });
            } else if ( randY > y && randY < y + side ) {
                randY += side;
                this.findBestCoordinates(emittedElements, { 'x': randX, 'y': randY });
            } else {
                return { 'randX': randX, 'randY': randY };
            }
        }
       },

       drawElement: function (boardParams, randomCoordinates, element) {
        var paper = boardParams.paper;
        var availablePaperElements = ['circle', 'rect'];
        var coordinates = this.findBestCoordinates(emittedElements, randomCoordinates);

        if (element['name'] === availablePaperElements[0]) {
            // Creates circle at calculated position with given radius.
            var circle = paper.circle(coordinates.randX, coordinates.randY, radius);
            circle.attr("fill",  element['color']);
            circle.attr("stroke", element['color']);
        } else {
            // Creates a rectangular for snake body element.
            var rect = paper.rect(coordinates.randX, coordinates.randY, side, side);
            rect.attr("fill", element['color']);
        }
         emittedElements.push({ 'x': coordinates.randX, 'y': coordinates.randY });
         return rect || circle;
       }
    }

    return GameUtils;
});