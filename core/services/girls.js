var reddit = require('fetch-reddit'),
    _ = require('lodash');

function load(args){
  return new Promise((resolve, reject) => {
    reddit
      .fetchPosts('/r/realgirls')
      .then(function(data){
        var urls = _.map(data.posts, function(post){
          return post.url;
        });
        urls = _.filter(urls, function(url){
          return url.indexOf('reddituploads') === -1;
        });
        resolve(urls.join(' \n '));
      });
  });
}

module.exports = {
  load: load
};
