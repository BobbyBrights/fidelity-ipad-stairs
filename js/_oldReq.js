  window.requestAnimationFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback,element){
                window.setTimeout(callback, 1000 / 60);
              };
    })(); 



if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
                                        window.cancelAnimFrame ||
                                        window.webkitCancelRequestAnimationFrame ||
                                        window.mozCancelRequestAnimationFrame ||
                                        window.msCancelRequestAnimationFrame ||
                                        window.oCancelRequestAnimationFrame ||
                                        window.clearTimeout);


}






  var lastTime = 0,
        vendors = ['moz', 'webkit', 'o', 'ms'],
        x;


if (!window.cancelRequestAnimationFrame) {
        // Check if standard partially supported
        if (!window.requestAnimationFrame) {
            // No support, emulate standard
            window.requestAnimationFrame = function(callback) {
                var now = new Date().getTime(),
                    nextTime = Math.max(lastTime + 16, now);

                return window.setTimeout(function() { callback(lastTime = nextTime); }, nextTime - now);
            };

            window.cancelRequestAnimationFrame = window.clearTimeout;
        } else {
            // Emulate cancel for browsers that don't support it
            vendors = window.requestAnimationFrame;
            lastTime = {};

            window.requestAnimationFrame = function(callback) {
                var id = x; // Generate the id (x is initialized in the for loop above)
                x += 1;
                lastTime[id] = callback;

                // Call the vendors requestAnimationFrame implementation
                vendors(function(timestamp) {
                    if (lastTime.hasOwnProperty(id)) {
                        var error;
                        try {
                            lastTime[id](timestamp);
                        } catch (e) {
                            error = e;
                        } finally {
                            delete lastTime[id];
                            if (error) { throw error; }         // re-throw the error if an error occurred
                        }
                    }
                });

                // return the id for cancellation capabilities
                return id;
            };

            window.cancelRequestAnimationFrame = function(id) {
                delete lastTime[id];
            };
        }
    }