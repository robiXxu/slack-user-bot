const config = require('../config/config'),
      easyMongo = require('easymongo'),
      mongo = new easyMongo({dbname: config.storage.db});

module.exports = {
  messages : mongo.collection('messages'),
  girls : mongo.collection('girls')
}