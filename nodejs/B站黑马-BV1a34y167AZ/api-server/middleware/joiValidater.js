const Resp = require('../utils/Resp')

module.exports = function joiValidater(schema, key = 'body', options = {}) {
  return (req, res, next) => {
    const { error, value } = schema.unknown().validate(req, options)
    if (error) {
      return res.send(new Resp(Resp.Fail, error.message.replace(/body\.|params\.|query\./, '')))
    }
    next()
  }
}