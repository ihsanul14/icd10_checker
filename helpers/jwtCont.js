const jwt = require('jsonwebtoken');

module.exports = {
  verify: function(token) {
    return jwt.verify(token, process.env.SECRET_CONT)
  },
  sign: function(obj, options) {
    return jwt.sign(obj, process.env.SECRET_CONT, options);
  }
}