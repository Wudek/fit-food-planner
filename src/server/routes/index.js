'use strict';
/*
 * GET home page.
 */
exports.index = function (req, res)
{
	res.render('index', { title : '' });
};

exports.partials = function (req, res)
{
	res.render(req.params.name);
};