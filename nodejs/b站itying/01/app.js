// 引入http模块
const http = require('http')
// 引入url模块

// 创建服务
http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {'Content-type': 'text/html;charset="utf-8"'})
  // 解决中文乱码
  res.write(`<head><meta charset='utf-8'></head>`)
  // 输出
  res.write(`<h1>zxxxxyong哈喽</h1>`)
  // 结束响应
  res.end()
}).listen(8081)

console.log('server running on 127.0.0.1:8081')
