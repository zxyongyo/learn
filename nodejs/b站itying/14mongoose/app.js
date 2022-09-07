const express = require('express')
const app = express()

const UserModel = require('./model/user')

// 查询
// UserModel.find({}, (err, docs) => {
//   console.log(docs)
// })

// 新增
const user = new UserModel({
  username: '    song  ',
  password: 'abc123'
})
user.save().then(console.log)

// 修改
// UserModel.updateOne({username: 'liang'}, {username: 'xxx'}, (err, res) => {
//   if(err){
//     console.log(err)
//     return
//   }
//   console.log(res)
// })

// 删除
// UserModel.deleteOne({username: 'liang'}, (err) => {
//   if(err){
//     console.log(err)
//     return
//   }
//   console.log('删除成功')
// })
