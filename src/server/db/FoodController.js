var Food = require("./dbSchema").Food;
var Promise = require('bluebird');

var createFood = module.exports.createFood = function (name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce)
{
	var food = new Food(
		{
			name               : name,
			protein            : protein,
			carbs              : carbs,
			fats               : fats,
			gramsEnabled       : gramsEnabled,
			gramsPerCup        : gramsPerCup,
			gramsPerUnit       : gramsPerUnit,
			gramsPerTablespoon : gramsPerTablespoon,
			gramsPerOunce      : gramsPerOunce
		});
	return new Promise(function(resolve, reject)
	{
		Food.create(food, function(err, client)
		{
			err ? reject(err) : resolve(client);
		});
	});
};

var createFoodIfNameDoesNotExist = module.exports.createFoodIfNameDoesNotExist = function (name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce)
{
	return new Promise(function(resolve, reject)
	{
		findFoodByName(name).then(function(existingFood)
		{
			if(existingFood)
			{
				resolve(existingFood);
			}
			else
			{
				createFood(name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce).then(function(newFood)
				{
					resolve(newFood);
				});
			}
		});
	});
};

var createOrUpdateFood = module.exports.createOrUpdateFood = function (name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce)
{
	return new Promise(function(resolve, reject)
	{
		findFoodByName(name).then(function(existingFood)
		{
			if(existingFood)
			{
				existingFood.protein = protein;
				existingFood.carbs = carbs;
				existingFood.fats = fats;
				existingFood.gramsEnabled = gramsEnabled;
				existingFood.gramsPerCup = gramsPerCup;
				existingFood.gramsPerUnit = gramsPerCup;
				existingFood.gramsPerTablespoon = gramsPerTablespoon;
				existingFood.gramsPerOunce = gramsPerOunce;
				existingFood.save(function(error, savedFood, numberAffected)
				{
					error ? reject(error) : resolve(savedFood);
				});
			}
			else
			{
				createFood(name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce).then(function(newFood)
				{
					resolve(newFood);
				});
			}
		});
	});
};

var listFoods = module.exports.listFoods = function()
{
	return new Promise(function(resolve, reject)
	{
		Food.find({}, function(err, foods)
		{
			err ? reject(err) : resolve(foods);
		});
	});
};

var findFoodByName = module.exports.findFoodByName = function(name)
{
	return new Promise(function(resolve,reject)
	{
		Food.findOne({name:name}, function(err, food)
		{
			err ? reject(err) : resolve(food);
		});
	});
};


var clearFoods = module.exports.clearFoods = function()
{
	return Food.remove().exec();
};
