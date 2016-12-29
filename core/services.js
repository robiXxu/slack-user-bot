var _ = require('lodash'),
    slack = require('../config/slack');

function load(service,cb){
  return new Promise((resolve,reject) => {
    try{
      var srv  = require('./services/' + getService(service));
      srv
        .load(getArgs(service))
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }catch(ex){
      reject('There\'s no service by that name');
    }
  });
}

function allow(service, channel){
  //only want to limit some services based on a list
  if(slack.rules[getService(service)]){
    return slack.rules[service].indexOf(channel) !== -1;
  }else{
    return true;
  }
}

function getService(service){
  return service.split(' ')[0];
}
function getArgs(service){
  var array = service.split(' ');
  return array.splice(1,array.length);
}

module.exports = {
    load: load,
    allow:allow
}
