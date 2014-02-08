'use strict';

var League = require('../models/leagues').League;
var logger = require('../.').logger;
var _ = require('lodash');

exports.getLeague = function (name, callback)
{
	League.findOne({name : name}).exec(
		function (err, league)
		{
			err ? logger.error(err) : callback && callback(league);
		}
	);
};

exports.getAll = function (callback)
{
	League.find({}, null, null, function (err, leagues)
	{
		err ? logger.error(err) : callback && callback(leagues);
	});
};

exports.setLeagues = function (names, callback)
{
	League.find({}, null, null, function (err, leagues)
	{
		if (err)
		{
			logger.error(err);
			return;
		}

		var existingLeagueNames = _.map(leagues, 'name');
		var newLeagueNames = _.difference(names, existingLeagueNames);
		var newLeagues = _.map(newLeagueNames, function (name)
		{
			return{name : name};
		});
		//TODO: check for deletion
		if (newLeagues.length === 0)
		{
			callback && callback(leagues);
		}
		else
		{
			League.create(newLeagues, function (err)
			{
				if (err)
				{
					logger.error(err);
				}
				else if (callback)
				{
					var newLeagues = Array.prototype.slice.call(arguments).slice(1);
					callback(_.union(leagues, newLeagues));
				}
			});
		}
	});
};

exports.findOrCreate = function (name, callback)
{
	League.findOne({name : name}, function (err, existingLeague)
	{
		if (err)
		{
			logger.error(err);
		}
		else if (!existingLeague)
		{
			League.create({name : name}, function (err, newLeague)
			{
				err ? logger.error(err) : callback && callback(existingLeague);
			});
		}
		else
		{
			callback && callback(existingLeague);
		}
	});
};

exports.clear = function (callback)
{
	League.collection.remove(function ()
	{
		callback && callback();
	});
};