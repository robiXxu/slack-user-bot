const _ = require('lodash'),
      easyMongo = require('easymongo'),
      config = require('../../config/config'),
      mongo = new easyMongo({dbname: config.storage.db});

function load(args){
  return new Promise((resolve,reject) => {
    //TODO: on module split also rewrite arguments handling on services
    // this will probably dissapear if i plan to make a web interface to search through history
    if(args.length === 2){
      var regexValue='\.*'+args[1]+'\.*';
      mongo.collection('messages')
        .find({
          channel: args[0],
          message: new RegExp(regexValue, 'i')
        })
        .then((data) => {
          resolve(processResult(data).join('\n'));
        });
    }else{
      reject('please provide the channel as the first argument and the search term as the second argument.\n Ex: "history #git rebase"');
    }
  });
}

function processResult(data){
  var output = [];
  console.log(data);
  _.each(data,(entry) => {

    var date = new Date(entry.timestamp);
    var msg = "\n =====================================";
    msg += "\nFrom: " + entry.from;
    msg += "\nDate: " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
    msg += "\nMessage: " + entry.message;
    output.push(msg);
  });
  return output;
}


module.exports = {
  load: load
};
