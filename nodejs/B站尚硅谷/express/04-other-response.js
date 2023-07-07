const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
  res.end('<h1>hello express</h1>')
})

app.get('/others', (req, res) => {
  // 重定向
  // res.redirect('https://zxyongyo.github.io')
  // 下载
  // res.download(path.resolve(__dirname, './package.json'))
  // json
  // res.json({name: 'zxyong'})
  // 响应文件内容
  res.sendFile(path.resolve(__dirname, `./logo512.png`))
})

app.get('*', (req, res) => {
  res.end('<h1>404 Page not Found</h1>')
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333')
})