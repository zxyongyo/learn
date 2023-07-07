const Resp = require('../utils/Resp')
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const userSchema = require('../schema/user')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../constants/index')

exports.register = async (req, response) => {
  const userinfo = req.body
  const { username, password } = userinfo

  db.query(
    'select username from ev_users where username = ?',
    username,
    (err, res) => {
      if (err) throw err

      if (res.length > 0) {
        return response.send(new Resp(Resp.Fail, 'username is already exist'))
      }

      userinfo.password = bcrypt.hashSync(password, 10)
      db.query('insert into ev_users set ?', userinfo, (error, result) => {
        if (error) throw error

        if (result.affectedRows !== 1) {
          return response.send(new Resp(Resp.Fail, 'register failed'))
        }
        return response.send(new Resp(Resp.Success, 'register success'))
      })
    }
  )
}

exports.login = (req, response) => {
  const { username, password } = req.body

  const sql =
    'select id, username, password, nickname, email from ev_users where username = ?'
  db.query(sql, username, (err, res) => {
    if (err) throw err

    if (res.length < 1) {
      return response.send(new Resp(Resp.Fail, 'user is not exist'))
    }

    const result = bcrypt.compareSync(password, res[0].password)
    if (!result) {
      return response.send(
        new Resp(Resp.Fail, 'username and password do not match')
      )
    }

    const token = jwt.sign({ ...res[0], password: '' }, secretKey, {
      expiresIn: '24h'
    })
    response.send(new Resp(Resp.Success, 'login success', token))
  })
}

exports.getUserinfo = (req, res) => {
  const id = req.auth.id

  const sql =
    'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    if (result.length < 1) {
      return res.send(new Resp(Resp.Fail, 'get userinfo failed'))
    }
    res.send(new Resp(Resp.Success, 'get userinfo success', result[0]))
  })
}

exports.updateUserinfo = (req, res) => {
  const id = req.auth.id
  const { nickname, email, user_pic } = req.body

  const sql = 'update ev_users set ? where id = ?'

  const data = {}
  if (nickname) {
    data.nickname = nickname
  }
  if (email) {
    data.email = email
  }
  if (user_pic) {
    data.user_pic = user_pic
  }

  db.query(sql, [data, id], (err, result) => {
    if (err) throw err
    if (result.affectedRows !== 1) {
      return res.send(new Resp(Resp.Fail, 'update userinfo failed'))
    }

    const sql =
      'select id, username, nickname, email, user_pic from ev_users where id = ?'
    db.query(sql, id, (error, data) => {
      if (err) throw error
      res.send(new Resp(Resp.Success, 'update userinfo success', data[0]))
    })
  })
}

exports.changePassword = (req, res) => {
  const id = req.auth.id
  const { oldPassword, newPassword } = req.body

  const sql = 'select password from ev_users where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    if (result.length < 1) {
      return res.send(new Resp(Resp.Fail, 'change password failed'))
    }
    const val = bcrypt.compareSync(oldPassword, result[0].password)
    if (!val) {
      return res.send(new Resp(Resp.Fail, 'origin password is wrong'))
    }

    db.query(
      'update ev_users set password = ? where id = ?',
      [bcrypt.hashSync(newPassword, 10), id],
      (error, data) => {
        if (error) throw error
        if (data.affectedRows !== 1) {
          return res.send(new Resp(Resp.Fail, 'change password failed'))
        }
        res.send(new Resp(Resp.Success, 'change password success', data))
      }
    )
  })
}
