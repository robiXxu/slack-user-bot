var _ = require('lodash'),
    slack = require('../config/slack');

function load(service,cb){
  var srv  = require('./services/' + getService(service));
  if(srv){
    srv.load(getArgs(service),function(data){
        cb(data);
    });
  }else{
    cb('*There\'s no service by that name*');
  }
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
