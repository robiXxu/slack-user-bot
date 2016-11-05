var gag = require('node-9gag'),
    _ = require('lodash');

function load(args,cb){
  if(args.length === 1){
    gag.find(args[0], function (err, res) {
      if(res){
        var urls = _.map(res.result, function(post){
          return post.url;
        });
        cb(urls.join(' \n '));
      }else{
        cb('9gag 404');
      }
    });

  }else{
    cb('please pass a tag as a argument.')
  }
}

module.exports = {
  load: load
};
