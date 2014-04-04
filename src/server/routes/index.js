'use strict';
/*
 * GET home page.
 */
exports.index = function (req, res)
{
	res.render('index', { title : '' });
};

exports.views = function (req, res)
{
	res.render(req.params.name);
};

exports.directives = function (req, res)
{
	res.render(req.params.name);
};