/**
 * Use requirejs since it limits the scope and thus prevents namespace conflicts.
 */
requirejs.config({
    baseUrl: "js",
    paths: {
        "lib": "lib",
        "jquery": "lib/jquery.min",
//        "raphael": "lib/raphael.min"
    }
//   shim: {
//      'lib/raphael': {
//         exports: 'Raphael'
//      }
//   }
});

    // todo: divs, canvas and raphael approaches will be implemented, separate them or add appropriate settings.
    define(['food', 'snake', 'jquery'], function(Food, Snake, $) {

        $('#start-fight').click(function(){
            // $(this).attr('disabled', true);
            $('#stop-fight').removeAttr('disabled');
            $('#total-score').show();
            new Snake();
            new Food();
        })

        $('#stop-fight').click(function () {
           // http://raphaeljs.com/reference.html#Element.pause
            Snake.prototype.stopMoving();
        })

});