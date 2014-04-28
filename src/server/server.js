'use strict';
var logger = require('./logger');
//Fallback to make sure an environment is set
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

function startServer()
{
	logger.info('Starting Server');
	//Configure express, routing and api
	var app = require('express')();
	require('./express')(app);
	require('./routes')(app);
	require('./db/test')();

	//Start express
	var port = require('./config/config').port;
	app.listen(port);
	logger.info('Server started on port ' + port);
}

require('./db').initialize().then(startServer);