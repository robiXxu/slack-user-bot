var _ = require('lodash'),
    config = require('./config/config'),
    slack = require('./config/slack'),
    command = require('./config/commands'),
    services = require('./core/services');
    irc = require('irc'),
    client = new irc.Client(slack.host, slack.user, config);

//5 = retry count
client.connect(5,(input) => {
  console.log(slack.user + " connected to " + slack.host);
});

client.addListener('message', (from, to, message) => {
  if(slack.rules.all && slack.rules.all.indexOf(to) !== -1){
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
            services
              .load(key)
              .then((data) => {
                if(data){
                  client.say(to, data);
                }else{
                  client.say(to, command.default);
                }
              })
              .catch((err) => {
                client.say(to, err);
              });
          }else{
            client.say(to, command.default);
          }
        }else{
          // TODO: fix DM issue
        }

      }
    }
  }
});

client.addListener('error', function(message) {
  console.log('error: ', message);
});
