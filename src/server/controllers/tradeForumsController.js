'use strict';

var TradeForum = require('../models/tradeForums').TradeForum;
var logger = require('../.').logger;
var _ = require('lodash');
var _s = require('underscore.string');

function createTradeForumObject(type, url, league)
{
	return {
		type   : type,
		url    : url,
		league : league
	};
}

function findValidLeague(leagues, leagueName)
{
	return _.find(leagues, function (league)
	{
		return league.name.toLowerCase() === leagueName.toLowerCase();
	});
}

exports.getAll = function (callback)
{
	TradeForum.find({}, null, null, function (err, tradeForums)
	{
		err ? logger.error(err) : callback && callback(tradeForums);
	});
};

exports.setTradeForums = function (forumSkeletonObjects, leagues, callback)
{
	TradeForum.find({}, null, null, function (err, existingTradeForums)
	{
		if (err)
		{
			logger.error(err);
			return;
		}

		var newForums = _.map(forumSkeletonObjects, function (forumSkeletonObject)
		{
			var league = findValidLeague(leagues, forumSkeletonObject.leagueName);
			return createTradeForumObject(forumSkeletonObject.type, forumSkeletonObject.url, league);
		});

		newForums = _.filter(newForums, function(forumObject)
		{
			return !_.find(existingTradeForums, function(existingTradeForum)
			{
				var sameType = forumObject.type === existingTradeForum.type;
				var sameLeague = existingTradeForum.league.equals(forumObject.league._id);
				return sameType && sameLeague;
			});
		});
		if(newForums.length > 0 && existingTradeForums.length > 0)
		{
			console.log('wtf');
			//TODO: check for deletion
		}
		if(newForums.length === 0)
		{
			callback && callback(existingTradeForums);
		}
		else
		{
			TradeForum.create(newForums, function (err)
			{
				if(err)
				{
					logger.error(err);
					return;
				}
				var createdForums = Array.prototype.slice.call(arguments).slice(1);
				var allForums = _.union(existingTradeForums, createdForums);
				callback && callback(allForums);
			});
		}
	});
};

exports.clear = function (callback)
{
	TradeForum.collection.remove(function ()
	{
		callback && callback();
	});
};