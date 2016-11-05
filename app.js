var _ = require('lodash'),
    config = require('./config/config'),
    slack = require('./config/slack'),
    command = require('./config/commands'),
    services = require('./core/services');
    irc = require('irc'),
    client = new irc.Client(slack.host, slack.user, config);

client.connect(5,function(input){
  console.log(slack.user + " connected to " + slack.host);
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    var key = message.trim();
    if(_.startsWith(key, slack.commandPrefix)){
      key = _.replace(key, slack.commandPrefix, '');
      var out = command[key];
      if(out){
        client.say(to,out);
      }else{
        services.load(key,function(data){
          client.say(to,data);
        })
      }

    }
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});
