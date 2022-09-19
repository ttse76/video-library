const mongoose = require('mongoose');

const logger = require('../utils/logger');
const userManager = require('../managers/userManager');
mongoose.connect('mongodb://localhost:27017/videolibrary',{
  dbName: 'videolibrary',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("open", async () => {
  logger.logInfo('db connected');
  const user = await userManager.getUser('admin');

  if (!user.err) {
    logger.logInfo('admin account found');
    return;
  }

  logger.logInfo('creating admin account...');
  const result = await userManager.addAdmin({
    username: 'admin',
    password: 'admin'
  });

  if(!result.addedNewUser) {
    logger.logError(`error adding user: ${result.reason}`);
    return;
  }

  logger.logInfo('admin account created');
});

module.exports = mongoose;