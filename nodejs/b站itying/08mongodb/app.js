// 引入mongodb
const { MongoClient } = require('mongodb')
// 定义数据库地址
const uri = 'mongodb://admin:123456@127.0.0.1:27017'
// 实例化MongoClient对象
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 连接数据库
// client.connect(err => {
//   if(err){
//     console.log(err)
//     return
//   }
//   console.log("数据库连接成功")
//   // 选择要操作的数据库
//   const db = client.db('zxyong')
//   // 选择要操作的集合
//   const user = db.collection("user")
  
//   const res = user.find().limit(10)
//   console.log(res)
//   client.close()
// })

// 操作mongo数据库
async function run() {
  try {
    // 连接数据库
    await client.connect().then(value => {
      console.log('数据库连接成功')
    })
    // 选择要操作的数据库 和 集合
    const user = client.db('zxyong').collection('user')

    // // 查询一条
    // const userinfo = await user.findOne({name: 'zxyong'}, {projection: {_id: 0}})
    // console.log(userinfo)

    // // 查询age大于11的 跳过0条 查询10条 按age正序 查询结果不包含_id  两种写法：
    // // const cursor = user.find({age: {$gt: 11}}).skip(0).limit(10).sort({age: 1}).project({_id: 0})
    // const cursor = user.find({age: {$gt: 11}}, {skip: 0, limit: 10, sort: {age: 1}, projection: {_id: 0}})
    // if(await cursor.count() === 0) {
    //   console.log('没有查询到数据')
    // }
    // await cursor.forEach(console.log)

    // // 插入一条
    // const result = await user.insertOne({name: 'two', age: 2})
    // console.log(result.insertedCount > 0 ? '插入成功' : '插入失败')

    // // 插入多条
    // const docs = [
    //   {name: 'three', age: 3},
    //   {name: 'four', age: 4},
    //   {name: 'five', age: 5}
    // ]
    // // ordered: true  如果一条插入失败  则全部都不插入
    // const result = await user.insertMany(docs, {ordered: true})
    // console.log(result.insertedCount > 0 ? `成功插入${result.insertedCount}条` : '插入失败')

    // // 更新一条
    // const result = await user.updateOne({name: 'aaa'}, {$set: {gender: 1}})
    // console.log(`更新了${result.modifiedCount}条记录`)

    // // 更新多条
    // const result = await user.updateMany({age: {$lte: 11}}, {$set: {gender: 0}})
    // console.log(`更新了${result.modifiedCount}条`)

    // // 删除一条   删除age类型是字符串的
    // const result = await user.deleteOne({age: {$type: 'string'}})
    // console.log(result.deletedCount > 0 ? `成功删除${result.deletedCount}条` : '删除失败')

    // // 删除多条
    // const result = await user.deleteMany({age: {$lt: 12}})
    // console.log(`成功删除${result.deletedCount}条`)

  } finally {
    await client.close()
  }
}

run().catch(console.log)