var _ = require('lodash'),
    slack = require('../config/slack');

function load(service,cb){

  var path = _.replace(service, ' ', '_');
  var srv  = require('./services/' + path);
  if(srv){
    srv.load(function(data){
        cb(data);
    });
  }else{
    cb('*There\'s no service by that name*');
  }
}

function allow(service, channel){
  //only want to limit some services based on a list
  if(slack.rules[service]){
    return slack.rules[service].indexOf(channel) !== -1;
  }else{
    return true;
  }
}

module.exports = {
    load: load,
    allow:allow
}
