'use strict';

var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
var _s = require('underscore.string');
var utils = require('../src/server/utils');
var logger = require('../src/server').logger;
var tradeForumsController = require('../controllers/tradeForumsController');

/**
 * This job will query each individual forum.
 * @constructor
 */
exports.ScanForumsJobs = function ()
{
	var _baseUrl = 'http://www.pathofexile.com';
	var _onFinishCallback;
	var _forumsLeft = 0;
	var _postsLeft = 0;

	function checkForEnd()
	{
		if(_forumsLeft === 0 && _postsLeft === 0)
		{
			_onFinishCallback && _onFinishCallback();
		}
	}

	function scanPosts(tradeForum, postUrls)
	{
		_postsLeft += postUrls.length;

		function parsePostHtml(html)
		{
		}

		function parsePost(err, resp, html)
		{
			if(err)
			{
				logger.error(err);
			}
			else
			{
//				var url = this.href;
				parsePostHtml(html);
			}
			_postsLeft--;
			checkForEnd();
		}
		//Scan each post
		_.forEach(postUrls, function(postUrl)
		{
			request(postUrl, parsePost);
		});
	}

	function scanForumForPosts(tradeForum)
	{
		function parseForumHtmlForPosts(html)
		{
			var parsedHtml = cheerio.load(html);
			var filterForumEntries = function (i, el)
			{
				var element = cheerio(el);
				if(element.hasClass('heading'))
				{
					return false;
				}
				var flags = element.find('.flags');
				var sticky = cheerio(flags).find('.sticky');
				if(!cheerio(sticky).hasClass('off'))
				{
					return false;
				}
				return true;
			};
			var forumHtmlPosts = parsedHtml('.forumTable').find('tr').filter(filterForumEntries).find('.thread');
			var convertHtmlPost = function(htmlEntry)
			{
				return _baseUrl + cheerio(htmlEntry).find('.status').find('a').attr('href');
			};

			scanPosts(tradeForum, _.map(forumHtmlPosts, convertHtmlPost));
		}

		function parseForumForPosts(err, resp, html)
		{
			if(err)
			{
				logger.error(err);
			}
			else
			{
				parseForumHtmlForPosts(html);
			}
			_forumsLeft--;
			checkForEnd();
		}
		request(tradeForum.url, parseForumForPosts);
	}

	function onGetTradeForums(tradeForums)
	{
		_forumsLeft = tradeForums.length;
		_.forEach(tradeForums, scanForumForPosts);
	}

	this.run = function (onFinishCallback)
	{
		_onFinishCallback = onFinishCallback;
		tradeForumsController.getAll(onGetTradeForums);
	};
};