const http = require('http')
const { static } = require('./module/routes')

http.createServer(function (req, res) {
  if(static(req, res, './static')){ return }

  const pathname = new URL(req.url, 'http://' + req.headers.host).pathname
  res.writeHead(200, {
    'Content-Type': 'text/html; charset="utf-8"'
  });
  switch(pathname) {
    case '/login':
      res.end('登录')
      break
    case '/admin':
      res.end('管理后台')
      break
    case 'register':
      res.end('注册')
      break
    default:
      res.end('404')
  }
  
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');