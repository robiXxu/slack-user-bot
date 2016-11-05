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
    var key = message.trim();
    if(_.startsWith(key, slack.commandPrefix)){
      key = _.replace(key, slack.commandPrefix, '');
      var out = command[key];
      if(out){
        if(_.startsWith(to, '#')){
          client.say(to,out);
        }else{
          // TODO: fix DM issue
        }
      }else{

        if(_.startsWith(to, '#')){
          if(services.allow(key, to)){
            services.load(key,function(data){
              if(data){
                client.say(to, data);
              }else{
                client.say(to, command.default);
              }
            });
          }else{
            client.say(to, command.default);
          }
        }else{
          // TODO: fix DM issue
        }

      }
    }
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});
