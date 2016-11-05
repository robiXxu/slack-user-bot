var reddit = require('fetch-reddit'),
    _ = require('lodash');

function load(args,cb){
  if(args.length==1){
    reddit.fetchPosts('/r/'+args[0])
    .then(function(data){
      cb(processResponse(data).join(' \n '));
    });
  }else{
    cb('no subreddit provided');
  }
}

function processResponse(data){
  var urls = _.map(data.posts, function(post){
    return post.url;
  });
  urls = _.filter(urls, function(url){
    return url.indexOf('reddituploads') === -1;
  });
  urls = _.filter(urls, function(url){
    return url.indexOf('imgur') !== -1;
  });
  return urls;
}

module.exports = {
  load: load
};
