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

//startServer();
require('./db').initialize().then(startServer);

//var Promise = require('bluebird');
//
//function delay(ms){
//	return new Promise(function(f){
//		setTimeout(f, ms);
//	});
//}
//
//var start = new Date();
//
//function traceTime()
//{
//	console.log(new Date() - start);
//}
//
//traceTime();
//
//function coolDelay(ms){
//	return delay(ms).then(function(){traceTime();});
//}

//coolDelay(1000);
//coolDelay(5000);


//Promise.delay(2000).then(traceTime);