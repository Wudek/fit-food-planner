var clientController = require('./clientController');
var foodController = require('./FoodController');
var logger = require('../logger');
var Promise = require('bluebird');

function countFoods()
{
	foodController.listFoods().then(function(foods)
	{
		logger.info('Food count: ' + foods.length);
	});
}

function countClients()
{
	clientController.listClients().then(function(clients)
	{
		logger.info('Client count: ' + clients.length);
	});
}

function createDefaultClient()
{
	clientController.createClientIfNameDoesNotExist('bob',true, 180, 200).then(function(client)
	{
		logger.info('Client ' + client.name + " exists");
	});
}

function createDefaultFoods()
{
	//(name, protein, carbs, fats, gramsEnabled, gramsPerCup, gramsPerUnit, gramsPerTablespoon, gramsPerOunce)
	Promise.all([
		foodController.createOrUpdateFood('Brown Rice Cooked', 0.026, 0.23, 0.009, true, 195, 0, 0, 0),
		foodController.createOrUpdateFood('Chicken Breast', 0.31, 0, 0.04, true, 140, 172, 0, 0),
		foodController.createOrUpdateFood('Extra Lean Ground Beef', 0.29, 0, 0.08, true, 0, 0, 0, 0),
		foodController.createOrUpdateFood('Broccoli', 0.03, 0.07, 0, 91, true, 0, 0, 0, 0),
		foodController.createOrUpdateFood('Celery', 0.01, 0.03, 0.01, true, 101, 0, 0, 0),
		foodController.createOrUpdateFood('Sweet Potato', 0.02, 0.21, 0, true, 200, 114, 0, 0),
		foodController.createOrUpdateFood('Egg Whites', 0.11, 0.01, 0, true, 243, 0, 0, 0),
		foodController.createOrUpdateFood('Avocado', 0.02, 0.09, 0.15, true, 150, 201, 0, 0),
		foodController.createOrUpdateFood('0% Plain Greek Yogurt', 0.11, 0.4, 0, true, 0, 500, 0, 0),
		foodController.createOrUpdateFood('Rice Cakes', 0.08, 0.82, 0.028, true, 0, 9, 0, 0),
		foodController.createOrUpdateFood('Tilapia', 0.26, 0, 0.026, true, 0, 87, 0, 0),
		foodController.createOrUpdateFood('Salmon', 0.2, 0, 0.13, true, 0, 396, 0, 0),
		foodController.createOrUpdateFood('Oatmeal', 0.13, 0.69, 0.07, true, 81, 0, 0, 0),
		foodController.createOrUpdateFood('Whole Wheat Pasta', 0.05, 0.27, 0.01, true, 140, 0, 0, 0),
		foodController.createOrUpdateFood('Blueberries', 0.01, 0.14, 0, true, 148, 1.36, 0, 0),
		foodController.createOrUpdateFood('Almonds', 0.21, 0.22, 0.49, true, 143, 1, 0, 0),
		foodController.createOrUpdateFood('Protein Bar', 19, 18.5, 3.5, false, 0, 1, 0, 0),
		foodController.createOrUpdateFood('P28 Bread Slice', 0.298, 0.255, 0.074, false, 0, 47, 0, 0),
		foodController.createOrUpdateFood('P28 Peanut Butter', 0.42, 0.21, 0.39, true, 0, 0, 0, 0),
		foodController.createOrUpdateFood('Whey Protein Shake', 24, 3, 1, false, 0, 1, 0, 0),
		foodController.createOrUpdateFood('Banana', 0.01, 0.23, 0, true, 150, 118, 0, 0),
		foodController.createOrUpdateFood('Natural Peanut Butter', 0.31, 0.19, 0.5, true, 0, 0, 0, 0)
	]).then(function (result)
	{
		countFoods();
	}).catch(function (error)
	{
		logger.error(error);
	});
}
module.exports = function()
{
	countClients();
	createDefaultClient();
	createDefaultFoods();
};