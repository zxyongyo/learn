const router = require('express').Router()

router.get('/home', (req, res) => {
  res.send('<h1>Home</h1>')
})

router.get('/order', (req, res) => {
  res.send('<h1>Order</h1>')
})

module.exports = router