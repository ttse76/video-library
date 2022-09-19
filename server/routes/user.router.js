const express = require('express');
const router = express.Router();

const userHandler = require('../handlers/user.handler');

router.get('/createuser', userHandler.createUser);

module.exports = router;
