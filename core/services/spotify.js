const _ = require('lodash'),
      spotify = require('spotifyr');

function load(args){
  console.log(args);
  return new Promise((resolve,reject) => {
    if(args.length){
      //search for track by default
      args[1] = args[1] || "track";
      spotify(args[0], args[1], (error, response) => {
        if(response){
          resolve(processResponse(response, args[1]).join('\n'));
        }else if(error){
          reject(error);
        }
      });
    }
  });
}

function processResponse(response, type){
  var output = [];
  var data = JSON.parse(response);
  if(data[type+'s']){
    _.each(data[type+'s'].items, (item) => {
      output.push(item.external_urls.spotify);
    });
  }

  return output;
}

module.exports = {
  load: load
};
