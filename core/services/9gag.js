const gag = require('node-9gag'),
      _ = require('lodash');

function load(args){
  return new Promise((resolve, reject) => {
    if(args.length === 1){
      gag.find(args[0], function (err, res) {
        if(res){
          var urls = _.map(res.result, function(post){
            return post.url;
          });
          resolve(urls.join(' \n '));
        }else{
          reject('9gag 404');
        }
      });

    }else{
      reject('please pass a tag as a argument.')
    }
  });
}

module.exports = {
  load: load
};
