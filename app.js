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
//will be movded
const rp = require('request-promise');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));



app.use(session(config.app.session))



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/*
app.get("/auth",(req,res,next) => {
	console.log("Loggin with linkding....")
	let options = {
		method:"GET",
		uri:"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77yj9s749chsnc&redirect_uri=http://localhost:3001/auth/linkedin/callback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social",
		resolveWithFullResponse:true
	}
	rp(options)
	.then((response) => {
		console.log("###########",response.headers)
		console.log("##########",)
		res.send(response.request.uri.href)
	}).catch((e) => {
		res.send(e)
	})
})


app.get("/auth/linkedin/callback",(req,res,next) => {
	//console.log("redirected i guesss but shall be front end")
	
	//
	res.redirect("http://localhost:3000/home")
})*/

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
