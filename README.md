# require-directory

Node.js module for require everything in a directory and bind them to a object synchronously.
If a file is tried to load with a missing dependency inside the file will load at a second attemp after loading the other files. There are maximum 5 attemps.

## Example
Any of the below

```javascript

// Return an object hash.
requireDirectory = require('reqdir');

// Load all files in a directory.
myFiles = null;
requireDirectory.load(myFiles, './myPath');

// Load all files in a directory and react of return value.
myFiles = null;
if (requireDirectory.load(myFiles, './myPath') === true) {
    console.log('all files loaded without error');
}

// Load all files in a directory and call callback on finish.
myFiles = null;
requireDirectory.load(myFiles, './myPath', function() {
    console.log('all files are loaded');
});

````

## Installation

`npm install reqdir`

## Usage

require('reqdir').load(object, directory, [callback]])

## License

MIT 

