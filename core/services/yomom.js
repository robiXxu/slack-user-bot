var rp = require('request-promise');

function load(cb){
  rp({
    uri: 'http://api.yomomma.info',
    json: true
  }).then(function(data){
    cb(data.joke);
  }).catch(function(err){
    cb(' these are sad times :( my joke stash is empty ask me later... maybe Santa will bring some :)');
  });
}

module.exports = {
  load: load
};
