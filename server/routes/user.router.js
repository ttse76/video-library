var express = require('express');
var router = express.Router();

const userHandler = require('../handlers/user.handler');

router.get('/createuser', userHandler.createUser);

module.exports = router;
