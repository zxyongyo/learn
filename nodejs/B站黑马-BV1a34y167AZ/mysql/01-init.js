const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'tables'
})

// db.query('select * from users', (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

// const user = { username: 'ironman', password: 'abcd123' }
// // const sql = 'insert into users (username, password) values (?, ?)'
// const sql = 'INSERT INTO users SET ?'
// db.query(sql, user, (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

// const user = {id: 7, username: 'ironman007', password: '1234567'}
// // const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?'
// const sql = 'UPDATE users SET ? WHERE id = ?'
// db.query(sql, [user, user.id], (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

const sql = 'DELETE FROM users WHERE id = ?'
db.query(sql, 7, (err, res) => {
  if (err) {
    return console.log(err)
  }
  console.log(res)
})