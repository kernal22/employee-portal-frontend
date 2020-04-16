const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  issue: (payload, expiresIn) => {
    return jwt.sign(payload, config.secret, {
      expiresIn,
    });
  },
};