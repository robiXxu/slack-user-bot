var _ = require('lodash');

function load(service,cb){

  var path = _.replace(service, ' ', '_');
  var srv  = require('./services/' + path);
  srv.load(function(data){
      cb(data);
  });
}

module.exports = {
    load: load
}
