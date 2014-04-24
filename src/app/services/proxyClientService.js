angular.module('services').factory('proxyClientService', function ()
{
	//Variables
	var delay = 1000;
	var clients = [];
	var clientCategories = [
		'Fat Loss',
		'Get Big',
		'Contest Prep'];
	var id = 0;
	//Functions
	var createID = () => id++;
	var randomMaleName = () =>_.sample([
		'John Doe',
		'Bob Ross']);
	var randomFemaleName = () => _.sample([
		'Jane Doe',
		'Katie Holmes']);

	//constructor(name, protein, carbs, fats, gramsPerCup, gramsPerUnit, gramsPerTablespoon = 14, gramsPerOunce = 28)
	var foods = [
		new Food('Brown Rice Cooked', 0.026, 0.23, 0.009, 195, 0),
		new Food('Chicken Breast', 0.31, 0, 0.04, 140, 86 * 2),
		new Food('Extra Lean Ground Beef', 0.29, 0, 0.08, 0, 0),
		new Food('Broccoli', 0.03, 0.07, 0,91, 0),
		new Food('Celery', 0.01, 0.03, 0.01, 101, 0),
		new Food('Sweet Potato', 0.02, 0.21, 0, 200, 114),
		new Food('Egg Whites', 0.11, 0.01, 0, 243, 0),
		new Food('Avocado', 0.02, 0.09, 0.15, 150, 201),
		new Food('0% Plain Greek Yogurt', 0.11, 0.4, 0, 0, 500),
		new Food('Rice Cakes', 0.08, 0.82, 0.028, 0, 9),
		new Food('Tilapia', 0.26, 0, 0.026, 0, 87),
		new Food('Salmon', 0.2, 0, 0.13, 0, 396),
		new Food('Oatmeal',0.13, 0.69, 0.07, 81, 0),
		new Food('Whole Wheat Pasta', 0.05, 0.27, 0.01, 140, 0),
		new Food('Blueberries', 0.01, 0.14, 0, 148, 1.36),
		new Food('Almonds', 0.21, 0.22, 0.49, 143, 1),
		new Food('Protein Bar', 19, 18.5, 3.5, 0, 1),
		new Food('P28 Bread Slice', 0.298, 0.255, 0.074, 0, 47),
		new Food('P28 Peanut Butter', 0.42, 0.21, 0.39, 0, 0),
		new Food('Whey Protein Shake', 24, 3, 1, 0, 1),
		new Food('Banana', 0.01, 0.23, 0, 150, 118),
		new Food('Natural Peanut Butter', 0.31, 0.19, 0.5, 0, 0)];

	var randomMaleWeight = () => _.random(150, 250);
	var randomFemaleWeight = () => _.random(100, 180);
	var randomWeight = (isMale) => isMale ? randomMaleWeight() : randomFemaleWeight();
	var randomMaleHeight = () => _.random(165, 190);
	var randomFemaleHeight = () => _.random(152, 175);
	var randomHeight = (isMale) => isMale ? randomMaleHeight() : randomFemaleHeight();
	var randomCategory = () => _.sample(_.union(clientCategories, [null]));
	var createClient = (name, isMale) => new Client(createID(), name, isMale, randomCategory(), randomHeight(isMale), randomWeight(isMale));
	var addClient = (client) =>
	{
		clients.push(client);
		return client;
	};
	var removeClient = (client) => _.remove(clients, function (existingClient)
	{
		return existingClient.id === client.id;
	});
	var getClient = (clientID) => _.find(clients, {'id' : clientID});
	var addRandomMaleClient = () => addClient(createClient(randomMaleName(), true));
	var addRandomFemaleClient = () => addClient(createClient(randomFemaleName(), false));
	var addRandomClient = () =>
	{
		var client = Math.random() < 0.5 ? addRandomMaleClient() : addRandomFemaleClient();
		addRandomDiet(client);
		return client;
	};
	var getRandomFood = () => _.sample(foods);
	var getRandomFoodItem = () =>new FoodItem(getRandomFood(), _.random(10, 100), 'g');
	var getRandomMeal = (name) =>
	{
		var meal = new Meal(name);
		for (var i = 0; i < _.random(2, 4); i++)
		{
			meal.addFoodItem(getRandomFoodItem());
		}
		return meal;
	};

	var addMeal = (diet, meal) =>
	{
		diet.addMeal(meal);
	};

	var addEmptyMeal = (diet) =>
	{
		addMeal(diet, new Meal('Meal ' + (diet.mealCount + 1).toString()));
	};

	var addRandomMeal = (diet) =>
	{
		addMeal(diet, getRandomMeal('Meal ' + (diet.mealCount + 1).toString()));
	};

	var getRandomDiet = () =>
	{
		var diet = new Diet(name);
		for (var i = 0; i < _.random(3, 6); i++)
		{
			addRandomMeal(diet);
		}
		return diet;
	};

	var addRandomDiet = (client) =>
	{
		client.diet = getRandomDiet('diet');
	};

	var fetchClientDetails = (clientID) =>
	{
		return new Promise(function (resolve, reject)
		{
			setTimeout(function ()
			{
				var result = getClient(clientID);
				if (result)
				{
					resolve(result.details);
				}
				else
				{
					reject();
				}
			}, delay);
		});
	};

	addRandomClient();
	addRandomClient();
	addRandomClient();

	return    {
		getClients : () => clients,
		getClientCategories : () => clientCategories,
		getFoods : () => foods,
		addClient : addClient,
		addRandomClient : addRandomClient,
		removeClient : removeClient,
		getClient : getClient,
		fetchClientDetails : fetchClientDetails,
		addRandom : addRandomClient,
		addEmptyMeal : addEmptyMeal,
		addRandomMeal : addRandomMeal
	};
});