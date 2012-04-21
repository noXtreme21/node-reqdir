module.exports = (function() {
    var fs = require('fs');
    
    var filesToLoad = new Array
      , loadedFiles = new Array
      , filesCache  = new Array
      , attemps     = 5;
    
    function load(object, path, callback) {
        // Check if callback is defined.
        callback = callback || null;
        
        // Remove last slash on path string.
        path = path.replace(/^((\/){0,1}.*)\/$/, '$1');
        // Read directory and define which files to load.
        filesToLoad = fs.readdirSync(path);
        
        console.info(' * try to load all files in "' + path + '"');

        // Try current attemp and load files.
        for (var i = 0; i < attemps && filesToLoad.length > 0; i++) {
            // Define which files to load in current step.
            filesCache  = filesToLoad;
            filesToLoad = new Array;
            
            // Load each file.
            for (file in filesCache) {
                // Check if filename does not start with . and end with a .js.
                if ((match = filesCache[file].match(/^([^.].*){1}\.js$/)) !== null) {
                    try {
                        // If no error occurs then load file.
                        object[match[1]] = require(path + '/' +  match[0]);
                        console.info(' * loaded file "' + match[0] + '"');
                    } catch (exception) {
                        // If error occurs try to load later.
                        console.warn(' * skipping file "' + match[0] + '" because missing dependencies');
                    }
                }
            }
        }
        
        if (callback !== null) {
            callback();
        }
        
        return (filesToLoad.length === 0) ? true : false;
    }
    
    return {
        load: load
    }
})();
