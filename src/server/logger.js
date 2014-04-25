'use strict';


//https://github.com/flatiron/winston/
//https://github.com/indexzero/winston-mongodb
var winston = require('winston');

module.exports = new (winston.Logger)({
	transports : [
		new (winston.transports.Console)(
			{
				'timestamp' : true,
				'colorize' : true
			})
	]
});