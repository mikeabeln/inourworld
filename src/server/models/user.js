'use strict';
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	    firstname: String,
	    lastname: String,
	    username: String,
	    password: String,
	    admin: {type: Boolean, default: false},
	    // date: { type: Date, default: Date.now },
	    createdOn: {type: Date, default: Date.now}
	});
module.exports = mongoose.model('User', userSchema);