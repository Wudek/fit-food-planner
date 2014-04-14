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
	var modifyClient = () => 0;
	var getClient = (clientID) => _.find(clients, {'id' : clientID});
	var addRandomMaleClient = () => addClient(createClient(randomMaleName(), true));
	var addRandomFemaleClient = () => addClient(createClient(randomFemaleName(), false));
	var addRandomClient = () =>
	{
		var client = Math.random() < 0.5 ? addRandomMaleClient() : addRandomFemaleClient();
		addRandomDiet(client);
		return client;
	};
	var foods = [
		new Food('rice', 2.6, 23, 0.9),
		new Food('chicken breast', 21, 0, 9),
		new Food('ground beef', 29, 0, 8),
		new Food('broccoli', 2.8, 7, 0.4),
		new Food('celery', 0.7, 3, 0.2),
		new Food('sweet potato', 1.5, 20, 0),
		new Food('salmon', 20, 0, 13),
		new Food('whole wheat pasta', 5, 27, 1),
		new Food('blueberry', 0.7, 14, 0.3),
		new Food('almonds', 21, 22, 49),
		new Food('peanut butter', 25, 20, 50)];
	var getRandomFood = () => _.sample(foods);
	var getRandomFoodItem = () =>
	{
		return new FoodItem(getRandomFood(), _.random(10, 100), 'g');
	};
	var getRandomMeal = (name) =>
	{
		var meal = new Meal(name);
		for (var i = 0; i < _.random(2, 4); i++)
		{
			meal.addFoodItem(getRandomFoodItem());
		}
		return meal;
	};
	var getRandomDiet = (name) =>
	{
		var diet = new Diet(name);
		for (var i = 0; i < _.random(3, 6); i++)
		{
			diet.addMeal(getRandomMeal('Meal ' + (i +1).toString()));
		}
		return diet;
	};
	var addRandomDiet = (client) =>
	{

		client.addDiet(getRandomDiet('diet ' + (client.diets.length + 1).toString()));
	};

	function fetchClientDetails(clientID)
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
	}

	addRandomClient();
	addRandomClient();
	addRandomClient();
	return    {
		getClients : function ()
		{
			return clients;
		},
		getClientCategories : function ()
		{
			return clientCategories;
		},
		addClient : addClient,
		removeClient : removeClient,
		getClient : getClient,
		fetchClientDetails : fetchClientDetails,
		addRandom : addRandomClient
	};
});