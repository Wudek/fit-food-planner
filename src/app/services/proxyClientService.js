angular.module('services', []).
	factory( 'proxyClientService',
		function()
		{
			var clients = [];
			var clientCategories = [];

			var randomMaleName = function()
			{
				return _.sample(['John Doe', 'Bob Ross']);
			};

			var randomFemaleName = function()
			{
				return _.sample(['Jane Doe', 'Katie Holmes']);
			};

			var randomCategory = function()
			{
				return _.sample(['', 'Fat Loss']);
			};

			var createClient = function(name, isMale, category)
			{
				return {
						name: name,
						isMale: isMale,
						category: category,
						height: 0,
						weight: 0
					};
			};

			var addClient = function(client)
			{
				clients.push(client);
			};

			var addRandomMaleClient = function()
			{
				addClient(createClient(randomMaleName(), true, randomCategory()));
			};

			var addRandomFemaleClient = function()
			{
				addClient(createClient(randomFemaleName(), false, randomCategory()));
			};

			var addRandomClient = function()
			{
				Math.random() < 0.5
					? addRandomMaleClient()
					: addRandomFemaleClient();
			};

			addRandomClient();
			addRandomClient();
			addRandomClient();

			return	{
				getClients: function(){return clients;},
				getClientCategories: function(){return clientCategories;},
				addClient: addClient,
				addRandom: addRandomClient
			};
		});