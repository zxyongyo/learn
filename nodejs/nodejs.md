# nodejs
## 1 HelloWorld

### 1.1第一个应用

```js
// 引入http模块
const http = require('http')
// 创建服务
http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
  // 输出
  res.write(`<h1>哈喽 nodejs</h1>`)
  // 结束响应
  res.end()
}).listen(8081)
```

### 1.2 解析url

```js
const http = require('http')
http.createServer((req, res) => {
  res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
  const url = req.url // 获取请求地址 /xxx?id=123
  const host = req.headers.host // 获取主机地址 http://localhost:8081
  if(url !== '/favicon.ico') {
    // 使用URL类
    const param = new URL(url, `http://${host}`).searchParams
    console.log(url+'\n'+`http://${host}\n`+param)
    res.write(`${param.get('msg')}`)
  }
  res.end()
}).listen(8081)
```

### 1.3 使用自启动工具 supervisor

`cnpm install -g supervisor`	安装supervisor

`supervisor app.js`	使用supervisor代替node启动

## 2 commonjs、模块化

​	commonJs 就是模块化的标准，nodejs就是CommonJs的实现

### 2.1 模块

- 模块可分为两类：一类是node提供的模块，称为核心模块，另一类是用户编写的模块，成为文件模块
- 自定义模块： 我们可以把公共的功能抽离成为一个单独的js文件作为一个模块，默认情况下这个模块里的方法和文件，是无法被外部访问的，如果想让外部访问就必须通过在模块中通过 `exports` 或者 `module.exports` 暴露属性或方法，在需要使用的文件中通过require引入这个模块

```js
// node_modules/request/index.js
const ajax = {
    post: () => { console.log('post') },
    get: () => { console.log('get') }
}
module.exports = ajax
// app.js
const ajax = require('request')
ajax.post()	// post
```

```js
// node_modules/request/index.js
const get = () => { console.log('get') }
const post = () => { console.log('post') }
exports.get = get
exports.post = post
// app.js
const { get, post } = require('request')
get()	// get
```

- nodejs中使用 `require` 或自动找node_modules下的文件，默认找index文件，可以在 `npm init --yes` 生成的`package.json`文件中，修改main属性来修改主文件

## 3 fs 模块

1. fs.stat     检查是文件还是目录

2. fs.mkdir    创建目录   recursive - 递归创建

3. fs.writeFile  创建写入文件   覆盖写入

4. fs.appendFile  追加写入文件

5. fs.readFile   读取文件

6. fs.readdir   读取目录

7. fs.rename    重命名  移动

8. fs.rmdir    删除目录

9. fs.unlink    删除文件

10. fs.createReadStream    从文件流中读取数据

11. fs.createWriteStream    写入文件

12. 管道流

    ```js
    const fs = require('fs')	// 引入fs模块
    
    const readStream = fs.createReadStream('./output.txt')	// 创建读取流
    const writeStream = fs.createWriteStream('./data/data.txt')	// 创建写入流
    // 从readStream读取 并写入到writeStream
    readStream.pipe(writeStream)
    ```


## 4 静态web服务

**[静态web服务]('./b站itying/04 静态web服务')**

## 5 mongodb

### 5.1 常用命令

**数据库**

- 查看所有数据库： `show dbs`

- 创建数据库：`use zxyong`

  使用zxyong这个数据库，如果想要创建成功，那必须往它的集合里插入一条数据

- 添加一个user集合并插入一条数据：`db.user.insert({name: 'zxyong', age: 18})` 

- 一次插入多条数据：db.user.insert([{name: 'xxx', age: 11}, {name: 'aaa', age: 23}])

- 查看当前数据库所有集合：`show collections`

- 删除一个集合： `db.user.drop()`

- 删除当前所在数据库：`db.dropDatabase()`

**查询操作**

- 查询所有记录：`db.user.find()`

- 查询去掉后的当前聚集集合中的某列的重复数据：`db.user.distinct("name")`

- 条件查询

  age=20: `db.user.find({age: 20})`
  age>20: `db.user.find({age: {$gt: 20}})`
  age<20: `db.user.find({age: {$lt: 20}})`
  age>=20: `db.user.find({age: {$gte: 20}})`
  age<=20: `db.user.find({age: {$lte: 20}})`
  
  10<age<20: `db.user.find({age: {$gt: 10, $lt: 20}})`
  
  name中包含zxy的：`db.user.find({name: /zxy/})`
  
  name以xx开头的：`db.user.find({name: /^xx/})`
  
  name以xx结尾的：`db.user.find({name: /xx$/})`
  
  查询指定列 name, age 的数据：`db.user.find({}, {name: 1, age: 1})`
  
  排除name列，age>20的：`db.user.find({age: {$gt: 20}}, {name: 0})`
  
  按age排序 1-升序，-1降序：`db.user.find().sort({age: -1})`
  
  查询前5条数据：`db.user.find().limit(5)`
  
  跳过前5条数据：`db.user.find().skip(5)`
  
  查询第11到20条数据：`db.user.find().skip(10).limit(10)`
  
  age=20或name=zxy：`db.user.find({$or: [{age:20}, {name:zxy}]})`	
  
  查询条数：`db.user.find().count()`

**修改数据**

- 修改name为zxy的age改为18：`db.user.update({name: 'zxy'}, {$set: {age: 18}})`

- 修改所有匹配到的项目：`db.user.update({age: {$gt: 20}}, {$set: {old: true}}, {multi: true})`

- 完整替换：`db.zxyong.update({name: 'zxy', age: '10'}, {name: 'xxx'})`

**删除数据**

- 删除所有匹配到的数据：`db.user.remove({name: 'zxy'})`
- 只删除一条： `db.user.remove({name: 'zxy'}, {justOne: true})`

### 5.2 索引

- 创建索引：`db.user.ensureIndex({name: 1})`
  - 1表示name键的索引按升序存储，-1表示降序
- 获取当前集合的索引：`db.user.getIndexes()`
- 删除索引：`db.user.dropIndex({name: 1})`

- 创建复合索引：`db.user.ensureIndex({name: 1, age: -1})`
  - 该索引创建后，基于name和age的查询会用到该索引，基于name的查询也会用到，但只基于age的查询不会用到，就是说查询条件必须是复合索引的前n个索引列
- 创建唯一索引：`db.user.ensureIndex({name: 1}, {unique: true})`

- 查询具体的执行时间：`db.user.find().explain("executionStats")`

### 5.3 账户权限配置

**账户权限配置**

1. 创建超级管理用户

   ```shell
   $ use admin
   $ db.createUser({
   	user: 'admin',
   	pwd: '123456',
   	roles: [{role: 'root', db: 'admin'}]
   })
   ```

2. 修改mongodb主目录/bin下mongod.cfg， 配置 `security: authorization: enabled`

3. 重启mongodb服务，使用超级管理员账户连接mongodb: `mongo -u admin -p 123456`

**常用命令**

- 查看当前库下的用户：`show users`
- 删除用户：`db.dropUser('zxyong')`
- 修改用户密码：`db.updateUser("admin": {pwd: "666666"})`
- 认证：`db.auth("admin", "666666")`

**nodejs连接时需要配置账户密码**

`const url = "mongodb://admin:123456@localhost:27017"`

### 5.4 aggregate 聚合管道

- 常用操作符

| 操作符   | description                          |
| -------- | ------------------------------------ |
| $project | 增加、删除、重命名字段               |
| $match   | 条件匹配。满足条件的才能进入下一阶段 |
| $limit   | 限制结果数量                         |
| $skip    | 跳过的数量                           |
| $sort    | 条件排序                             |
| $group   | 条件组合结果                         |
| $lookup  | 引入其他集合的数据（表关联）         |

```js
db.order.aggregate([
    // 'order'集合通过'order_id'关联'order_item'集合,将'order_item'集合的内容放到’items‘
    {
        $lookup: {	
            from: "order_item",
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
        }
    },
    // 查询结果只有：'order_id','allprice','all_num','items'
    {
        $project: {
            _id: 0,
            order_id: 1,
            all_price: 1,
            all_num: 1,
            items: 1
        }
    },
    // 查询 all_price >= 20的结果
    {
        $match: {
            all_price: {
                $gte: 20
            }
        }
    },
    // 跳过0条，限制10条
    {
        $skip: 0
    },
    {
        $limit: 10
    },
    // 按all_price正序
    {
        $sort: {
            all_price: 1
        }
    }
])
```

### 5.5 nodejs操作mongodb

```js
// 引入mongodb
const { MongoClient } = require('mongodb')
// 定义数据库地址
const uri = 'mongodb://admin:123456@127.0.0.1:27017'
// 实例化MongoClient对象
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 操作mongo数据库
async function run() {
  try {
    // 连接数据库
    await client.connect().then(value => {
      console.log('数据库连接成功')
    })
    // 选择要操作的数据库 和 集合
    const user = client.db('zxyong').collection('user')

    // 查询一条
    /* const userinfo = await user.findOne({name: 'zxyong'}, {projection: {_id: 0}})
    console.log(userinfo) */

    // 查询age大于11的 跳过0条 查询10条 按age正序 查询结果不包含_id  两种写法：
    // const cursor = user.find({age: {$gt: 11}}).skip(0).limit(10).sort({age: 1}).project({_id: 0})
    /* const cursor = user.find({age: {$gt: 11}}, {skip: 0, limit: 10, sort: {age: 1}, projection: {_id: 0}})
    if(await cursor.count() === 0) {
      console.log('没有查询到数据')
    }
    await cursor.forEach(console.log) */

    // 插入一条
    /* const result = await user.insertOne({name: 'two', age: 2})
    console.log(result.insertedCount > 0 ? '插入成功' : '插入失败') */

    // 插入多条
    /* const docs = [
      {name: 'three', age: 3},
      {name: 'four', age: 4},
      {name: 'five', age: 5}
    ]
    // ordered: true  如果一条插入失败  则全部都不插入
    const result = await user.insertMany(docs, {ordered: true})
    console.log(result.insertedCount > 0 ? `成功插入${result.insertedCount}条` : '插入失败') */

    // 更新一条
    /* const result = await user.updateOne({name: 'aaa'}, {$set: {gender: 1}})
    console.log(`更新了${result.modifiedCount}条记录`) */

    // 更新多条
    /* const result = await user.updateMany({age: {$lte: 11}}, {$set: {gender: 0}})
    console.log(`更新了${result.modifiedCount}条`) */

    // 删除一条   删除age类型是字符串的
    /* const result = await user.deleteOne({age: {$type: 'string'}})
    console.log(result.deletedCount > 0 ? `成功删除${result.deletedCount}条` : '删除失败') */

    // 删除多条
    /* const result = await user.deleteMany({age: {$lt: 12}})
    console.log(`成功删除${result.deletedCount}条`) */

  } finally {
    await client.close()
  }
}

run().catch(console.log)
```

## 6 使用express

```js
const express = require('express')	//引入express
const app = express()	// 实例化express
app.get('/', (req, res) => { res.send('hello') })	// 配置路由
app.listen(3000)	// 监听端口
```

### 6.1 获得传参

- 获取get传参

  ```js
  // /news?id=12345
  app.get('/news', (req, res)=>{ console.log(req.query) })	//{id: '12345'}
  ```

- 获取post传参

  ```js
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.post('/doLogin',(req,res)=>{ console.log(req.body) })
  ```

### 6.2 使用ejs模板引擎

```js
const express = require('express')()
const ejs = require('ejs')
app.set('views')  // 设置视图的对应目录
app.set('view engine', 'html')   // 设置默认的模板引擎
app.engine('html', ejs.__express)  // 定义模板引擎
```

### 6.3 托管静态资源

```js
const express = require('express')
const app = express()
app.use(express.static('static'))
```

### 6.4 中间件

- express中间件有：应用级中间件、路由级中间件、错误处理中间件、内置中间件、第三方中间件

```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 内置中间件
app.use(express.static('./static'))
// 第三方中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// 应用级中间件
app.use((req,res,next)=>{ next() })
// 路由级中间件
app.get('/', (req, res, next)=>{ next() })
// 错误处理中间件
app.use((req,res)=>{ res.status(404).render('404 NOT FOUND') })

```

### 6.5 express路由模块化

- express中允许通过`express.Router`创建模块化的、可挂载的路由

```js
// routes/user/index.js
const express = require('express')
const router = express.Router()
router.get('/list', (req, res) => { res.send('用户列表') })
router.get('/add', (req, res) => { res.send('添加用户') })
router.get('/delete', (req, res) => { res.send('删除用户') })
module.exports = router

// app.js
const express = require('express')
const app = express()
const user = require('./routes/user')
app.use('/user', user)
app.listen(3000)	// localhost:3000/user/list
```

