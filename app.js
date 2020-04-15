'use strict';
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//import UglifyJS
//requre Passport before modeldefinition
var passport = require('passport');

//route API
require('./app_api/models/db');
//requre strategy after model definition
require('./app_api/config/passport');
// require('./uglifileJS');
var routesApi = require('./app_api/routes/index');
var users = require('./app_server/routes/users');
var app = express();
app.all('*',function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
app.set('views', path.join(__dirname,'app_server', 'views'));

// view engine setup
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
//Initialize Passport.
app.use(passport.initialize());
//app.use('/', routes);
app.use('/api',routesApi);
app.use('/users', users);

app.use(function(req,res){
    res.sendfile(path.join(__dirname,'app_client','index.html'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        next(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
     next(err);
});
//error handlers
//catch unauthorised errors
app.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({
            "message" : err.name + ": " + err.message
        });
    }
     next(err);
});

module.exports = app;
