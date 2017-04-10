'use strict';

const express = require('express');
const router = express.Router(); 
const User = require('../models/user');

const isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} 
	else {
		console.log('unauthorized');
		res.status(401).end();
	}
};

const isAlreadyLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		console.log('User already logged in as:' + req.user.username);
		res.status(400).send('You are already Logged in as: ' + req.user.username);
	} 
	else {
		return next();
	}
};

module.exports = function(passport) {

	// router.get('/', function(req, res, next) {
	// 	if(req.isAuthenticated()) {
	// 		console.log(true);
	// 	} else {
	// 		console.log(false);
	// 	}
	// 	next();
	// });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	router.post('/a/signup', passport.authenticate('signup'), function (req, res) {
  		res.json({
  			user: req.user
		});
	});

	router.post('/a/login', isAlreadyLoggedIn, passport.authenticate('login'), function (req, res) {
  		res.json({
  			user: req.user
  		});
	});

	router.get('/user', isAuthenticated, function (req, res) {
	      res.json({
	      	user: req.user
	      });

	 });

	return router;
};