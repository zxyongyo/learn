const express = require('express')
const app = express()
const ejs = require('ejs')
const { MongoClient } = require("mongodb")
const bodyParser = require('body-parser')

//接收post参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// 配置模板引擎
app.set('views')  // 设置视图的对应目录
app.set('view engine', 'html')   // 设置默认的模板引擎
app.engine('html', ejs.__express)  // 定义模板引擎
// 配置静态目录
app.use(express.static('static'))
// 应用级中间件
app.use((req, res, next) => {
  console.log(req.url)
  next()
})

const uri = 'mongodb://admin:123456@127.0.0.1:27017'

// 用户列表
app.get('/userList', async (req, res) => {
  let client
  try { 
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const user = client.db('zxyong').collection('user')
    const result = await user.find().skip(0).limit(10).toArray()
    res.render('userList', {user: result})
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
})

app.get('/login', (req, res) => {
  res.render('login')
})

// 登录
app.post('/doLogin', async (req, res) => {
  let client
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const user = client.db('zxyong').collection('user')
    const result = await user.findOne(req.body)
    const msg = result ? '登录成功':'登录失败'
    res.send(msg)
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
})

app.get('/resgister', (req, res) => {
  res.render('resgister')
})

// 注册
app.post('/doResgist', async (req, res) => {
  let client
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const user = client.db('zxyong').collection('user')
    const result = await user.insertOne(req.body)
    const msg = result.insertedCount===1 ? '注册成功':'注册失败'
    res.send(msg)
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
})

// 删除
app.get('/doDelete', async (req, res) => {
  let client
  try {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const user = client.db('zxyong').collection('user')
    const result = await user.deleteOne(req.query)
    const msg = result.deletedCount===1 ? '删除成功':'删除失败'
    res.send(msg)
  } catch (e) {
    console.log(e)
  } finally {
    client.close()
  }
})

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND')
})

app.listen(3000)