'use strict';

var Promise = require('bluebird');

module.exports.initialize = function()
{
	return new Promise(function(f, reject)
	{
		var config = require('./config');
		var mongoose = require('mongoose');
		var logger = require('../server').logger;

		logger.info('Connection initiated to database');

		var connectSuccess = function()
		{
			logger.info('Connection established to database');
			f();
		};

		mongoose.connect(config.db, {}, connectSuccess);
	});
};
