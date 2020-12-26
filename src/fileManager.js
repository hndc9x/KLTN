const Promise = require('promise');
const readFile = Promise.denodeify(require('fs').readFile);
module.exports = {
    readJsonFile :(jsonFileName) => {
        return  readFile(jsonFileName,'utf8').then((response)=> {
            return JSON.parse(response);
        });
    }
    
};

