'use strict';

const express = require('express'),
	       path = require('path'),
	    favicon = require('serve-favicon'),
	     logger = require('morgan'),
 cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
     mongoose = require('mongoose');
      let app = express();

const mongoUri = require('./config').mongoUri;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { db: { bufferMaxEntries: 0 } });

var db = mongoose.connection;

app.use(require('prerender-node'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const passport = require('passport'),
       session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
  initPassport = require('./passport/init');

app.use(session({
  secret: 'troutsnot',
  store: new MongoStore({mongooseConnection: db}),
  resave: false,
  saveUninitialized: false,
  cookie : { httpOnly: true, maxAge: 3600000}
}));

app.use(passport.initialize());
app.use(passport.session());


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  initPassport(passport);

  const routes = require('./routes/index')(passport);
  app.use('/', routes);

  if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, '/../')));
    app.use(express.static(path.join(__dirname, '/../.tmp')));
    app.use(express.static(path.join(__dirname, '/../app')));
  } else if (app.get('env') === 'production'){
    app.use(express.static(path.join(__dirname, '/dist')));
  }

  app.use(function (req, res, next) {
    console.log('404 error - resource not found');
    res.status(404).redirect('/#!/');
    next();
  });

});

module.exports = app;