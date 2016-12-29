var rp = require('request-promise');

function load(args){
  return new Promise((resolve, reject) => {
    rp({
      uri: 'http://api.yomomma.info',
      json: true
    }).then(function(data){
      resolve(data.joke);
    }).catch(function(err){
      reject('these are sad times :( my joke stash is empty... ask me later... maybe Santa will bring some :)');
    });
  });
}

module.exports = {
  load: load
};
