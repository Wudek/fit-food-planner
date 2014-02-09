'use strict';

var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
var _s = require('underscore.string');
var logger = require('../.').logger;
var utils = require('../utils');
var leaguesController = require('../controllers/leaguesController');
var tradeForumsController = require('../controllers/tradeForumsController');

/**
 * This job will query the forum page and repopulate the leagues list and trade forums list in the DB.
 * @constructor
 */
exports.PopulateForumsJob = function ()
{
	var _onFinishCallback;
	var _baseUrl = 'http://www.pathofexile.com';
	var _validate = true;

	function isValidForumName(name)
	{
		return _s.include(name, 'Trading') && utils.includesAny(name, ['Shops', 'Buying', 'Selling']);
	}

	function getForumName(subforum)
	{
		return subforum.children[0].data;
	}

	function isValidForum(subforum)
	{
		return isValidForumName(getForumName(subforum));
	}

	function createForumSkeletonObject(subforum)
	{
		var splitName = getForumName(subforum).split(' ');
		var leagueName = _(splitName).first();
		var forumTypeName = _(splitName).last();
		var url = _baseUrl + subforum.attribs.href;
		return {
			leagueName : leagueName.toLowerCase(),
			type       : forumTypeName.toLowerCase(),
			url        : url
		};
	}

	function parseForumObjects(parsedHtml)
	{
		var forumSkeletonObjects = [];
		var leagueNames = [];
		var subforumsHtml = parsedHtml('.forum_name').find('.name').find('a');
		_.each(subforumsHtml, function (subforumHtml)
		{
			if (isValidForum(subforumHtml))
			{
				var forumSkeletonObject = createForumSkeletonObject(subforumHtml);
				if (!_.contains(leagueNames, forumSkeletonObject.leagueName))
				{
					leagueNames.push(forumSkeletonObject.leagueName);
				}
				forumSkeletonObjects.push(forumSkeletonObject);
			}
		});
		leaguesController.setLeagues(leagueNames, function (leagues)
		{
			tradeForumsController.setTradeForums(forumSkeletonObjects, leagues, onFinish);
		});
	}

	function parseHtml(err, resp, html)
	{
		err ? logger.error(err) : parseForumObjects(cheerio.load(html));
	}

	function onFinish()
	{
		if(_validate)
		{
			leaguesController.getAll(function(leagues)
			{
				tradeForumsController.getAll(function(tradeForums)
				{
					if(leagues.length !== 4 || tradeForums.length !== leagues.length * 3)
					{
						logger.error('PopulateForumsJob seems to have failed.');
					}
					_onFinishCallback && _onFinishCallback();
				});
			});
		}
		else
		{
			_onFinishCallback && _onFinishCallback();
		}
	}

	this.run = function (onFinishCallback)
	{
		_onFinishCallback = onFinishCallback;
		request(_baseUrl + '/forum', parseHtml);
	};
};