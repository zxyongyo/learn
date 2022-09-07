// 引入http模块
const http = require('http')
// 创建服务
http.createServer((req, res) => {
  res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})

  if(req.url !== '/favicon.ico') {
    const url = '?' + req.url.split('?')[1] // 获取请求地址 /xxx?id=123
    // 使用URL类
    const param = new URLSearchParams(url)
    console.log(param)
    res.write(`${param.get('msg')}`)
  }

  res.end()
}).listen(8081)

console.log('server running on 127.0.0.1:8081')
