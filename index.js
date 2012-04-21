module.exports = (function() {
    var fs = require('fs');

    var filesToLoad = new Array
      , loadedFiles = new Array
      , filesCache  = new Array
      , attemps     = 5;

    function loadAll(object, path, callback) {
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
                    readableName = match[1].replace(/([^a-zA-Z].?)/g, function($1){return $1.toUpperCase().replace(/[^a-zA-Z]/,'');});

                    try {
                        // If no error occurs then load file.
                        object[readableName] = require(path + '/' +  match[0]);
                        console.info(' * loaded file "' + match[0] + '"');
                    } catch (exception) {
                        // If error occurs (mayby because of missing dependencies) try to load later.
                        console.warn(' * skipping file "' + match[0] + '" because missing dependencies');
                        console.warn(exception);
                    }
                }
            }
        }

        if (callback !== null) {
            callback();
        }

        return (filesToLoad.length === 0) ? true : false;
    }


    function loadSeperate(path, callback) {
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
                    readableName = match[1].replace(/([^a-zA-Z].?)/g, function($1){return $1.toUpperCase().replace(/[^a-zA-Z]/,'');});

                    try {
                        // If no error occurs then load file.
                        object = require(path + '/' +  match[0]);
                        console.info(' * loaded file "' + match[0] + '"');

                        if (callback !== null) {
                            callback(object, match[0], readableName);
                        }
                    } catch (exception) {
                        // If error occurs (mayby because of missing dependencies) try to load later.
                        console.warn(' * skipping file "' + match[0] + '"');
                        console.warn(exception);
                    }
                }
            }
        }

        return (filesToLoad.length === 0) ? true : false;
    }

    
    return {
        loadAll: loadAll
      , loadSeperate: loadSeperate
    }
})();
