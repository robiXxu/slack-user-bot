var config = require('./config/config');
var slack = require('./config/slack');
var irc = require('irc');

var client = new irc.Client(slack.host, slack.user, config);

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});
