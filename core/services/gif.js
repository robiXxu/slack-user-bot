const _ = require('lodash')
      rp = require('request-promise');
      
//TODO: clean
function load(args){
  return new Promise((resolve, reject) => {
    if(args.length > 0){
      args[1] = args[1] || 1;
      var options = {
          method: 'GET',
          uri: 'http://api.giphy.com/v1/gifs/search?q=' + args[0] + '&api_key=dc6zaTOxFJmzC',
          json: true
      };
      rp(options)
        .then((body) => {
          if(body.data && body.data.length > 0){
            
            var images = [];
            _.each(body.data, (object) => {
              images.push(((object.original && object.original.url) ? object.original.url : object.bitly_url));
            });
            args[1] = args[1] > images.length ? images.length : args[1];
            resolve(images.slice(0,args[1]).join(' \n '));
          }else{
            reject('gif: response error');
          }
        })
        .catch( err => reject(err) );

    }else{
      reject('please pass a tag as a argument.')
    }
  });
}

module.exports = {
  load: load
};
