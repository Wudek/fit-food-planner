'use strict';

var mongoose = require('mongoose');

var TradeForumSchema = mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['buying', 'selling', 'shops']
		},
		url: String,
		league: {
			type: mongoose.Schema.ObjectId,
			ref: 'League'
		}
	});

module.exports.TradeForum = mongoose.model('TradeForum', TradeForumSchema);