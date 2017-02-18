const _ = require('lodash'),
      config = require('./config/config'),
      slack = require('./config/slack'),
      command = require('./config/commands'),
      services = require('./core/services');
      irc = require('irc'),
      client = new irc.Client(slack.host, slack.user, config.irc)
      db = require('./core/db');

//5 = retry count
client.connect(5,(input) => {
  console.log(slack.user + " connected to " + slack.host);
});


//TODO: split everything into separate modules
client.addListener('message', (from, to, message) => {

  if(_.startsWith(to, '#') && !_.startsWith(message, slack.commandPrefix) && config.storage.enabled){
    db.messages.save({
      from: from,
      channel: to,
      message: message,
      timestamp: Date.now()
    });
  }

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
                  if(_.isArray(data)){
                    var chunks = _.chunk(data,5);
                    var delay = 0;
                    var count = 0;
                    _.each(chunks, (chunk) => {
                      //slack doesn't handle a lot of images at once :( ... that's the reason behind this "hack"
                      setTimeout(() => {
                        console.log("Sending chunk " , count);
                        client.say(to,chunk.join('\n'));
                        count++;
                      }, delay * 1000);
                      delay += 3;
                    });
                  }else{
                    client.say(to, data);
                  }
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
