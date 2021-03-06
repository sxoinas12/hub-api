var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var app = express()

const config = require("./auth/config");
const bodyParser = require('body-parser')
const RoutingSystem = require('./Systems/RoutingSystem')
const UserModule = require("./routes/Users/index")
const session = require("express-session");
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));



app.use(session(config.app.session))



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


//app.use(UserModule._middleware);
app.use(RoutingSystem.router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
