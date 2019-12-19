
var mysql = require('mysql')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

const db = mysql.createConnection({ // 数据库参数配置
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeMysql'
})
db.connect(err => { // 连接数据库
  if (err) throw err;
  console.log('数据库连接成功');
})

module.exports = function (app) {

  // 创建数据库
  // app.get('/createdb', (req, res)=>{ 
  //   let sql = "create database nodeMysql"
  //   db.query(sql, (err,result)=>{
  //     if(err){
  //       console.log(err)
  //     }else{
  //       console.log(result)
  //       res.send("database create success!")
  //     }
  //   })
  // })

  // 添加数据
  app.post('/setData', urlencodedParser, (req, res) => {
    let val = req.body.item;
    let sql = `insert into todos (id, item) values (null, "${val}")`
    db.query(sql, function(err, result){
      if (err) {
        console.log('添加失败' + err)
      } else {
        console.log('添加成功')
        res.json(result)
      }
    })
  })  

  // 删除
  app.delete('/todo/:id', function(req, res){
    let sql = `delete from todos where id=${req.params.id}`
    db.query(sql, (err, result)=>{
      if(err){
        console.log('删除失败'+err)
      }else{
        console.log('删除成功')
      }
      res.json(result)
    })
  })

  // 查询数据
  app.get('/getData', (req, res) => {
    let sql = 'select * from `todos`';
    db.query(sql, (err, result) => {
      if (err) {
        console.log('查询失败' + err)
      } else {
        console.log('查询成功')
        res.render('todo', {todos: result})
      }
    })
  })
}