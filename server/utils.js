'use strict';

var _ = require('lodash');
var _s = require('underscore.string');

exports.includesAny = function (string, multiple)
{
	var entries = _.isArray(multiple) ? multiple : _.isString(multiple) ? [multiple] : [];

	return _.some(entries, function (entry)
	{
		return _s.include(string, entry);
	});
};

exports.includesAll = function (string, multiple)
{
	var entries = _.isArray(multiple) ? multiple : _.isString(multiple) ? [multiple] : [];
	return _.every(entries, function (entry)
	{
		return _s.include(string, entry);
	});
};

