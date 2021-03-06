const _ = require('lodash'),
      async = require('async'),
      reddit = require('fetch-reddit'),
      config = require('../../config/config'),
      db = require('../db');

module.exports = {
  load: load
};

function load(args){
  return new Promise((resolve, reject) => {
    if(args.length > 0 && config.storage.enabled){
      handleArgs(args)
        .then(data => resolve(data))
        .catch(data=> reject(data));
    }else{
      fetchAll()
        .then(data => resolve(data))
        .catch(err => reject(err));
    }
  });
}


function handleArgs(args){
  return new Promise((resolve, reject) => {
    if(_.indexOf(['add', 'remove', 'list'], args[0]) !== -1){
      switch (args[0]) {
        case 'add':
          add(args)
            .then(data=> resolve(data))
            .catch(err => reject(err));
          break;
        case 'remove':
          remove(args)
            .then(data => resolve(data))
            .catch(err => reject(err));
          break;
        case 'list':
          list()
            .then(data => resolve(data))
            .catch(err => reject(err));
          break;
      }
    }else{
      reject('command is invalid');
    }
  });
}

function find(args){
  return new Promise((resolve, reject) => {
    db.girls
      .count({ subreddit:args[1] })
      .then(count => resolve( { count:count }))
      .catch(err => reject(err));
  });
}

function list(args){
  return new Promise((resolve, reject) => {
    db.girls
      .find()
      .then((data) => {
        data.length > 0 ?
          resolve(_.map(data,'subreddit').join(' *|* '))
        : reject('no subreddits in db :(');
      })
      .catch(err => reject(err));
  });
}

function add(args){
  return new Promise((resolve, reject) => {
    find(args)
      .then( (data) =>{
        data.count === 0 ? 
          db.girls
            .save({ subreddit:args[1] })
            .then(() => { resolve(args[1] + ' subreddit saved'); })
            .catch( err => reject(err) )
        : reject(args[1] + ' subreddit already in db')
      })
      .catch(err => reject(err));
  });
}

function remove(args){
  return new Promise((resolve,reject) => {
    find(args)
      .then( (data) => {
          data.count !== 0 ?
            db.girls
              .remove({ subreddit:args[1] })
              .then(() => { resolve(args[1] + ' subreddit was deleted') })
              .catch(err => reject(err))
          : reject(args[1] + ' subreddit not found in db')
      })
      .catch( err => reject(err) );
  });
}

function fetchAll(){
  return new Promise((resolve, reject) => {
    db.girls
      .find()
      .then((data) => {
        if(data.length !== 0){
          var proms = [];
          _.each(data, (object) => {
            proms.push(function(callback){
              fetchPostsFrom(object.subreddit)
                .then((data) => { callback(null,data); })
                .catch((err) => { callback(err,null); });
            });
          });
          async.parallel(proms,(err, results) => {
            if(results){
              var posts = _.flattenDeep(results);
              formatOutput(posts)
                .then(urls => resolve(urls));
            }else{
              reject(err);
            }
          });
        }else{
          fetchPostsFrom('realgirls')
            .then((data) => {
              resolve(formatOutput(data));
            })
            .catch(err => reject(data))
        }
      })
      .catch(err => reject(err));
  });
}

function fetchPostsFrom(subreddit){
  return new Promise((resolve,reject) => {
    reddit
      .fetchPosts('/r/' + subreddit)
      .then(function(data){
        resolve(data.posts);
      })
      .catch(err => reject(err));
  });
}

function formatOutput(data){
  return new Promise((resolve,reject) => {
    var urls = _.map(data, function(post){
      return post.url;
    });
    urls = _.filter(urls, function(url){
      return url.indexOf('imgur') !== -1;
    });
    resolve(urls);
  });
}