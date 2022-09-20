const jwt = require('jsonwebtoken');

const { API_KEY_SECRET } = require('../../config.json');

exports.generateKey = (username) => {
  return jwt.sign({ username }, API_KEY_SECRET);
};