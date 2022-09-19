const userManager = require('../src/managers/userManager');

exports.createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await userManager.addNewUser({ username, password });

  return res.status(result.status).send(result);
};