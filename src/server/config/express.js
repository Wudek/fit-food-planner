'use strict';
var express = require('express');
var config = require('./config');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var liveReload = require('connect-livereload');
var serveStatic = require('serve-static');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app)
{
	app.set('showStackError', true);
	app.locals.pretty = true;
	//Don't use logger for test env
	if (process.env.NODE_ENV !== 'test')
	{
		app.use(morgan('dev'));
	}
	//Set views path, template engine and default layout
	app.set('views', config.root + '\\build\\views\\');
	app.set('view engine', 'jade');
	//Enable jsonp
	app.enable('jsonp callback');
	//cookieParser should be above session
	app.use(cookieParser());
	// request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded());
	app.use(bodyParser.json());
	app.use(methodOverride());
	//express/mongo session storage
	//		app.use(express.session({
	//			secret: 'poeah_secret',
	//			store: new mongoStore({
	//				db: db.connection.db,
	//				collection: 'sessions'
	//			})
	//		}));
	//live reload middleware
	app.use(liveReload());
	//connect flash for flash messages
	//		app.use(flash());
	//dynamic helpers
	//		app.use(helpers(config.app.name));
	//use passport session
	//		app.use(passport.initialize());
	//		app.use(passport.session());
	//Setting the fav icon and static folder
	//		app.use(express.favicon());
	app.use(serveStatic(config.root + '/build'));
};