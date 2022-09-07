const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const upload = require('./routes/upload')
const bodyParser = require('body-parser')

//接收post参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));  // 静态资源
// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.__express)

app.use('/upload', upload)

app.get('/', (req, res) => {
  res.send('home')
})
app.listen(3000)