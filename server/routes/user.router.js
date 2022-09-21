const express = require('express');
const router = express.Router();

const userHandler = require('../handlers/user.handler');

router.post('/createuser', userHandler.createUser);
router.post('/authenticate', userHandler.authenticateUser);

module.exports = router;
