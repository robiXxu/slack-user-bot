var fs = require('fs');
module.exports = {
  'help': fs.readFileSync("./help.txt", "utf8"),
  'info': '*slack-user-bot* : https://github.com/robiXxu/slack-user-bot',
  'music': 'Have my *music* : https://soundcloud.com/robixxu https://www.youtube.com/playlist?list=PLmQkU7VKC1kwSNXJrrwJRgriK4CH-scbZ / https://www.youtube.com/playlist?list=PLmQkU7VKC1kwhxrsx6CMqr60nkOv-3Wry / https://www.youtube.com/playlist?list=PLmQkU7VKC1kw398h_h7ok5VYrUzmfch83 / https://www.youtube.com/playlist?list=PLmQkU7VKC1kxJl3nlU61P3yQI1BpQacxT ',
  'default': 'i currently have nothing to say...'
}
