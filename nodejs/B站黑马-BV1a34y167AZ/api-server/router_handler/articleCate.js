const Resp = require('../utils/Resp')
const db = require('../db/index')
const schema = require('../schema/articleCate')

exports.getCategories = (req, res) => {
  const sql =
    'select id, name, alias from ev_article_cates where is_deleted = 0 order by id asc'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(new Resp(Resp.Success, 'get category list success', result))
  })
}

exports.getCategoryById = (req, res) => {
  const sql = 'select id, name, alias from ev_article_cates where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    if (result.length < 1) {
      return res.send(new Resp(Resp.Fail, 'get category failed'))
    }
    res.send(new Resp(Resp.Success, 'get categroy success', result[0]))
  })
}

exports.insertCategory = (req, res) => {
  db.query(
    'select id from ev_article_cates where name = ? or alias = ?',
    [req.body.name, req.body.alias],
    (e, r) => {
      if (e) throw e
      if (r.length > 0) {
        return res.send(new Resp(Resp.Fail, 'Duplicate value'))
      }

      db.query(
        'insert into ev_article_cates set ?',
        req.body,
        (err, result) => {
          if (err) throw err
          if (result.affectedRows < 1) {
            return res.send(new Resp(Resp.Fail, 'insert failed'))
          }

          db.query(
            'select id, name, alias from ev_article_cates where id = ?',
            result.insertId,
            (error, data) => {
              if (error) throw error
              res.send(
                new Resp(Resp.Success, 'get category list success', data)
              )
            }
          )
        }
      )
    }
  )
}

exports.deleteCategoryById = (req, res) => {
  const sql = 'update ev_article_cates set is_deleted = 1 where id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    if (result.affectedRows < 1) {
      res.send(new Resp(Resp.Fail, 'delete failed'))
    }
    res.send(new Resp(Resp.Success, 'delete success', result.affectedRows))
  })
}

exports.updateCategory = (req, res) => {
  const { id, name, alias } = req.body

  db.query(
    'select * from ev_article_cates where id != ? and (name = ? or alias = ?)',
    [id, name, alias],
    (e, data) => {
      if (e) throw e
      if (data.length) {
        return res.send(new Resp(Resp.Fail, 'Duplicate value'))
      }

      db.query(
        'update ev_article_cates set ? where id = ?',
        [req.body, id],
        (err, result) => {
          if (err) throw err
          if (result.affectedRows < 1) {
            res.send(new Resp(Resp.Fail, 'update failed'))
          }
          res.send(new Resp(Resp.Success, 'update success', result.affectedRows))
        }
      )
    }
  )
}
