'use strict';
module.exports = function (app)
{
	app.get('/', exports.index);
	app.get('/views/:name', exports.view);
	app.get('/directives/:name', exports.view);
//	var api = require('./api');
//	app.get('/data', api.list);
};
exports.index = function (req, res)
{
	res.render('index', { title : '' });
};
exports.view = function (req, res)
{
	res.render(req.params.name);
};