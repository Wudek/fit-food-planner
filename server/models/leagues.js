'use strict';

var mongoose = require('mongoose');

var LeaguesSchema = mongoose.Schema(
	{
		name: String
	});

module.exports.League = mongoose.model('League', LeaguesSchema);