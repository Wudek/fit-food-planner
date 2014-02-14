angular.module('services', []).
	factory( 'proxyClientService',
		function()
		{
			var clients = [];

			var randomMaleName = function()
			{
				return _.sample(['John Doe', 'Bob Ross']);
			};

			var randomFemaleName = function()
			{
				return _.sample(['Jane Doe', 'Katie Holmes']);
			};

			var createClient = function(name, isMale)
			{
				return {
						name: name,
						isMale: isMale
					};
			};

			var addClient = function(client)
			{
				clients.push(client);
			};

			var addRandomMaleClient = function()
			{
				addClient(createClient(randomMaleName(), true));
			};

			var addRandomFemaleClient = function()
			{
				addClient(createClient(randomFemaleName(), false));
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
				addClient: addClient,
				addRandom: addRandomClient
			};
		});