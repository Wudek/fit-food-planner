angular.module('services', []).
	factory( 'proxyClientService',
		function()
		{
			var clients = [];
			var clientCategories = ['Fat Loss', 'Get Big', 'Contest Prep'];

			function randomMaleName()
			{
				return _.sample(['John Doe', 'Bob Ross']);
			}

			function randomFemaleName()
			{
				return _.sample(['Jane Doe', 'Katie Holmes']);
			}

			function randomCategory()
			{
				return _.sample(_.union(clientCategories, [null]));
			}

			function createClient(name, isMale, category)
			{
				return {
						name: name,
						isMale: isMale,
						category: category,
						height: 0,
						weight: 0
					};
			}


			function addClient(client)
			{
				clients.push(client);
			}

			function modifyClient(client)
			{
			}

			function addRandomMaleClient()
			{
				addClient(createClient(randomMaleName(), true, randomCategory()));
			}

			function addRandomFemaleClient()
			{
				addClient(createClient(randomFemaleName(), false, randomCategory()));
			}

			function addRandomClient()
			{
				Math.random() < 0.5
					? addRandomMaleClient()
					: addRandomFemaleClient();
			}

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