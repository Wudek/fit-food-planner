'use strict';

module.exports = function ()
{
	//https://github.com/flatiron/winston/
	//https://github.com/indexzero/winston-mongodb
	var winston = require('winston');
	var logger = new (winston.Logger)({
		transports : [
			new (winston.transports.Console)(
				{
					'timestamp' : true,
					'colorize' : true
				})
			]
		});

	return logger;
};