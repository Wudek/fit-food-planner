'use strict';
var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
var leaguesController = require('./controllers/leaguesController');
var PopulateForumsJob = require('./jobs/PopulateForumsJob').PopulateForumsJob;
var ScanForumsJob = require('./jobs/ScanForumsJobs').ScanForumsJobs;
var ClearDBJob = require('./jobs/ClearDBJob').ClearDBJob;

module.exports.populateForums = function()
{
	new PopulateForumsJob().run();
};

module.exports.scanForums = function()
{
	new ScanForumsJob().run();
};

var fullScan = module.exports.fullScan = function()
{
	new PopulateForumsJob().run(function()
	{
		new ScanForumsJob().run();
	});
};

var clearAndScan = module.exports.clearAndScan = function()
{
	new ClearDBJob().run(fullScan);
};
