'use strict';

var Promise = require('bluebird');
var logger = require('./logger');
var config = require('./config/config');



module.exports.initialize = function()
{
	return new Promise(function(f, reject)
	{
		var mongoose = require('mongoose');

		logger.info('Connection initiated to database');

		var connectSuccess = function()
		{
			logger.info('Connection established to database');
			f();
		};

		mongoose.connect(config.db, {}, connectSuccess);
	});
};
