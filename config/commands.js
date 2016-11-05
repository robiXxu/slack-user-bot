var fs = require('fs');
module.exports = {
  'help': fs.readFileSync("./help.txt", "utf8"),
}
