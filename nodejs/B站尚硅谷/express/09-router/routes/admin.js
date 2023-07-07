const router = require('express').Router()

router.get('/admin', (req, res) => {
  res.send('<h1>Admin</h1>')
})

router.get('/setting', (req, res) => {
  res.send('<h1>Setting</h1>')
})

module.exports = router