var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var quantityTypes = [
	'g',
	'ounce',
	'cup',
	'tablespoon',
	'unit'];

var foodSchema = new Schema(
	{
		name               : String,
		protein            : Number,
		carbs              : Number,
		fats               : Number,
		gramsPerCup        : { type: Number, default: 0 },
		gramsPerUnit       : { type: Number, default: 0 },
		gramsPerTablespoon : { type: Number, default: 0 },
		gramsPerOunce      : { type: Number, default: 0 }
	}
);
var clientSchema = new Schema(
	{
		name     : String,
		male     : Boolean,
		category : { type: String, default: '' },
		height   : Number,
		weight   : Number,
		diet     : {
			name  : { type: String, default: '' },
			meals : [
				{
					name  : String,
					items : [
						{
							food         : { type : ObjectId, ref : 'Food' },
							quantity     : Number,
							quantityType : {type : String, enum : quantityTypes}
						}
					]
				}
			]
		}
	});

module.exports.Food = mongoose.model('Food', foodSchema);
module.exports.Client = mongoose.model('Client', clientSchema);