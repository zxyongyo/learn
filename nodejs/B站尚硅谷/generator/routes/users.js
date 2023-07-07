var express = require('express')
var router = express.Router()
const formidable = require('formidable')
const path = require('path')
const os = require('os')

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource')
})

router.get('/profile', (req, res) => {
  console.log(os.tmpdir())
  res.render('profile')
})

router.post('/profile', (req, res, next) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.resolve(__dirname, '../public/images/user_avatars'),
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    res.json({ fields, files })
  })
})

module.exports = router
