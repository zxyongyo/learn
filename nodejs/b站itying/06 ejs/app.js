const http = require('http')
const app = require('./module/routes')

http.createServer(function (req, res) {
  if (app.static(req, res, './static')) {
    return
  }

  const pathname = new URL(req.url, 'http://' + req.headers.host).pathname.replace('/', '')
  res.writeHead(200, {
    'Content-Type': 'text/html; charset="utf-8"'
  });
  try {
    app[pathname](req, res);
  } catch(e) {
    app['error'](req, res)
  }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');