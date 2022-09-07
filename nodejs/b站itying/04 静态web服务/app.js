const http = require('http')
const fs = require('fs')
const path = require('path')
const { getMime } = require('./module/common'); 

http.createServer(function (req, res) {
  const url = new URL(req.url, 'http://' + req.headers.host).pathname
  if (url === '/favicon.ico') {
    return
  }
  const pathName = url == '/' ? 'index.html' : url
  fs.readFile('./static' + pathName, (err, data) => {
    const extName = path.extname(pathName)
    const mime = getMime(extName)
    res.writeHead(200, {
      'Content-Type': mime + '; charset="utf-8"'
    });
    if (err) {
      res.end('404页面不存在')
      return
    }
    res.write(data)
    res.end()
  })
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');