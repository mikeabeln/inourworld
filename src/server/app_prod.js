var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var braintree = require('braintree');
var gateway = require('./gateway/exec');
// var multer = require('multer');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/**
 * Development Settings
 */
 

// changes it to use the optimized version for production
app.use(express.static(path.join(__dirname, '/dist')));

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// var mongoUri = 'mongodb://localhost/test';
var mongoUri = 'mongodb://mikeontheweb:429Moeller@ds013981.mlab.com:13981/mikeontheweb';

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {


    var routes = require('./routes/index');
    app.use('/', routes.index);

    // console.log(db.mynewcollection.find());
    
});


module.exports = app;