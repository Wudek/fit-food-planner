'use strict';
var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
var leaguesController = require('./leaguesController');
var PopulateForumsJob = require('./PopulateForumsJob').PopulateForumsJob;
var ScanForumsJob = require('./ScanForumsJobs').ScanForumsJobs;
var ClearDBJob = require('./ClearDBJob').ClearDBJob;

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
