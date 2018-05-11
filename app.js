const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const connectDb = require('./db/connect');
const config = require('./config');

const indexRouter = require('./routes/index');
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');

const app = express();

connectDb(config.mongoUrl);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: config.secret}));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
