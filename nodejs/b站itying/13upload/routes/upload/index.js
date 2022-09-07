const express = require('express')
const router = express.Router()
const multer = require('../../utils/multer')

router.get('/form', (req, res) => {
  res.render('upload.html')
})

router.post('/doUpload', multer.array('pic', 3), (req, res) => {
  res.send({file: req.files, body: req.body})
})

module.exports = router