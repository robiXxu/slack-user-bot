const _ = require('lodash'),
    slack = require('../config/slack');

function load(service){
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
      console.log(ex);
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
  if(service.indexOf('|') === -1){
    return service.split(' ')[0];
  }else{
    return formatInput(service)[0];
  }
}

function getArgs(service){
  var array = service.split(' ');
  if(service.indexOf('|') !== -1){
    array = formatInput(service);
  }
  return array.splice(1,array.length);
}

function formatInput(service){
  //TODO: need to find a better way to handle args
  var input = [];
  var splitValues = service.split(/\|.*\|/g);
  //name of the service
  input.push(splitValues[0].trim());
  //the string value - will assume this is the second argument all the time
  var found = service.match(/\|.*\|/g)[0];
  found = found.replace('|', '').replace('|', '');
  input.push(found.trim());
  //the remaining args
  _.each(splitValues.splice(1,splitValues.length), (arg) => {
    input.push(arg.trim());
  });
  //remove any empty string
  input = input.filter(Boolean);
  return input;
}

module.exports = {
  load: load,
  allow:allow
}
