 var express = require('express'),
	    path = require('path'),
	 favicon = require('serve-favicon'),
	  logger = require('morgan'),
cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  		 app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 
// if (app.get('env') === 'development') {

//     //  will change in production since compiling to dist
//     app.use(express.static(path.join(__dirname, '../client')));
//     app.use(express.static(path.join(__dirname, '../client/.tmp')));
//     app.use(express.static(path.join(__dirname, '../client/app')));

//     //  error handling
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });

// } else {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler - no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
// }

process.nextTick(function() {
	var routes = require('./routes/index');
    app.use('/', routes.index);

})

module.exports = app;