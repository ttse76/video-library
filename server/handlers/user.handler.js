const userManager = require('../src/managers/userManager');
const apiKeyManager = require('../src/managers/apiKeyManager');

exports.createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await userManager.addNewUser({ username, password });

  return res.status(result.status).send(result);
};

exports.getUser = async (req, res) => {
  if (!req.query || !req.query.username) return res.status(404).send({ msg: 'user not found' });

  const username = req.query.username;

  const userInfo = await userManager.getUser(username);

  if (userInfo.err) {
    return res.status(userInfo.status).send({ err: userInfo.err });
  }

  return res.status(200).send(userInfo.userInfo);
};

exports.authenticateUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const isMatch = await userManager.checkPassword(username, password);

  if (!isMatch) {
    return res.status(200).send({ isMatch, msg: 'Username or password incorrect' });
  }

  return res.status(200).send({ isMatch, username, apiKey: apiKeyManager.generateKey(username)});
};