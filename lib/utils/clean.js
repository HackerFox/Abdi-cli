const findFolder = require('node-find-folder');

class Clean {
    constructor(){
    }

    buildDir(){
        const ff_result = new findFolder('public');
        console.log(ff_result);
    }
}


module.exports = Clean;