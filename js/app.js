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
    define(['game', 'jquery'], function(Game, $) {

        $('#start-fight').click(function(){
            $(this).attr('disabled', true);
            $('#pause-fight').removeAttr('disabled');
            $('#finish-fight').removeAttr('disabled');
            $('.score-wrapper').show();
            new Game();
        })

        $('#finish-fight').click(function(){
            Game.prototype.finish();
        });

        $('#pause-fight').click(function () {
           // http://raphaeljs.com/reference.html#Element.pause
            Game.prototype.stop();
        })

});