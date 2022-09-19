const express = require('express');
const router = express.Router();

const userHandler = require('../handlers/user.handler');

router.post('/createuser', userHandler.createUser);

module.exports = router;
