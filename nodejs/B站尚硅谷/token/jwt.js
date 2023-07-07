const jwt = require('jsonwebtoken')

// const token = jwt.sign({
//   username: 'zxyong'
// }, 'zxyong', {
//   expiresIn: 60 * 60
// })

const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp4eW9uZyIsImlhdCI6MTY4Njg4MDUyNiwiZXhwIjoxNjg2ODg0MTI2fQ.1gYv7qY_G1NnYHJ-6weE69O-7B5jN9WC2OqlYfykNe4'
jwt.verify(t, 'zxyong', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})