'use strict';
var leaguesController = require('../controllers/leaguesController');
var tradeForumsController = require('../controllers/tradeForumsController');

/**
 * This job will clear the db.
 * @constructor
 */
exports.ClearDBJob = function ()
{
	this.run = function (onFinishCallback)
	{
		leaguesController.clear(function ()
		{
			tradeForumsController.clear(function ()
			{
				onFinishCallback && onFinishCallback();
			});
		});
	};
};