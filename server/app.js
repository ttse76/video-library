const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./src/db/connect');

const userRouter = require('./routes/user.router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRouter);

module.exports = app;
