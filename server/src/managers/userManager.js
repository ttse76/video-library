const userContext = require('../schemas/user.schema');
const { USER, ADMIN } = require('../constants/userRoles.json');

const addUser = async ({ username, password, role }) => {
  const inDb = await userContext.findOne().byUsername(username.toLowerCase());

  if (inDb) return { addedNewUser: false, status: 409, reason: 'User with username already exists' };

  const newUser = new userContext({
    username: username.toLowerCase(),
    password: password,
    role: role
  });

  try {
    await newUser.save();
    return { addedNewUser: true, status: 200, username: username};
  } catch (err) {
    return { addedNewUser: false, status: 500, reason: 'Error occured on save'}
  }
};

exports.addNewUser = async ({ username, password }) => {
  return await addUser({ username, password, role: USER });
};

exports.addAdmin = async ({ username, password }) => {
  return await addUser({ username, password, role: ADMIN });
};

exports.getUser = async (username) => {
  if (!username) return { err: `username not set` };

  try {
    const user = await userContext.findOne().byUsername(username);

    if (!user) return { status: 404, err: `username ${username} not found` };

    return { status: 200, userInfo: user };
  } catch(err) {
    return { status: 500, err: err };
  }
};

exports.checkPassword = async (username, inputPassword) => {
  const user = await userContext.findOne().byUsername(username);

  if (!user) return false;

  return await user.comparePassword(inputPassword);
};
