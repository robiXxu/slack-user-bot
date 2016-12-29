var slack = require('./slack');

module.exports.irc = {
  nick: slack.user,
  userName: slack.user,
  password: slack.pass,
  port: slack.port || 6667,
  autoRejoin: true,
  autoConnect: false,
  channels: [],
  secure: true,
  sasl: false,
  retryDelay: 2000,
  channelPrefixes: "&#",
  encoding: 'UTF-8'
};

module.exports.storage = {
  enabled: true,
  db: 'slack-user-bot'
}
