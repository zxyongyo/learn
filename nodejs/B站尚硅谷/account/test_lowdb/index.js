const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const adapter = new FileSync(path.resolve(__dirname, 'db.json'))
const db = low(adapter)

// db.defaults({posts: [], user: []}).write()

// insert
db.get('posts').push({id: 3, content: 'a content', time: Date.now()}).write()

// delete
// const res = db.get('posts').pop().write()
// const res = db.get('posts').unshift().write()
// const res = db.get('posts').remove({id: 3}).write()
// console.log(res)


// update
// const res = db.get('posts').find({id: 1}).assign({time: Date.now()}).write()
// console.log(res)

// select
// const res = db.get('posts').find({id: 1}).value()
// const res = db.has('user').value()
// const res = db.get('posts').map('time').value()
// console.log(res)