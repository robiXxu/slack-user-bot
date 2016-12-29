const reddit = require('fetch-reddit'),
      _ = require('lodash');

function load(args){
  return new Promise((resolve,reject) => {
    if(args.length==1){
      reddit
        .fetchPosts('/r/'+args[0])
        .then(function(data){
          resolve(processResponse(data).join(' \n '));
        });
    }else{
      reject('no subreddit provided');
    }
  });
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
