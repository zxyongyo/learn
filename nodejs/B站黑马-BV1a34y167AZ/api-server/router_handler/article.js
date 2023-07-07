const Resp = require('../utils/Resp')
const db = require('../db/index')

exports.postArticle = (req, res) => {
  if (!req.file) {
    return res.send(new Resp(Resp.Fail, 'cover_img is required'))
  }

  req.body.cover_img = req.file.path.replaceAll('\\', '/').substr(6)
  req.body.pub_date = new Date().toLocaleString()
  req.body.author_id = req.auth.id

  const sql = 'insert into ev_articles set ?'
  db.query(sql, req.body, (e, result) => {
    if (e) throw e
    if (result.affectedRows < 1) {
      return res.send(new Resp(Resp.Fail, 'insert failed'))
    }
    db.query(
      'select * from ev_articles where id = ?',
      result.insertId,
      (err, data) => {
        if (err) throw err
        res.send(new Resp(Resp.Success, 'insert success', data[0]))
      }
    )
  })
}

exports.getArticleList = (req, res) => {
  const sql = 'select * from ev_articles where is_deleted = 0 order by id asc'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(new Resp(Resp.Success, 'insert success', result))
  })
}

exports.deleteArticleById = (req, res) => {
  const id = req.params.id
  const sql = 'update ev_articles set is_deleted = 1 where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    if (result.affectedRows < 1) {
      return res.send(new Resp(Resp.Fail, 'delete failed'))
    }
    res.send(new Resp(Resp.Success, 'delete success', result.affectedRows))
  })
}

exports.getArticleById = (req, res) => {
  const sql = 'select * from ev_articles where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    res.send(new Resp(Resp.Success, 'get article success', result[0]))
  })
}

exports.updateArticle = (req, res) => {
  if (req.file) {
    req.body.cover_img = req.file.path.replaceAll('\\', '/').substr(6)
  }

  const sql = 'update ev_articles set ? where id = ?'
  db.query(sql, [req.body, req.body.id], (e, result) => {
    if (e) throw e
    if (result.affectedRows < 1) {
      return res.send(new Resp(Resp.Fail, 'update failed'))
    }
    db.query(
      'select * from ev_articles where id = ?',
      req.body.id,
      (err, data) => {
        if (err) throw err
        res.send(new Resp(Resp.Success, 'update success', data[0]))
      }
    )
  })
}
