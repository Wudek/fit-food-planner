var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema(
	{
		name : String
	});

module.exports.Item = mongoose.model('Item', ItemSchema);