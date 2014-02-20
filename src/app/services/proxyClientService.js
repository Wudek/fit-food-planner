angular.module('services', []).
	factory( 'proxyClientService',
		function()
		{
			var clients = [];
			var clientCategories = ['Fat Loss', 'Get Big', 'Contest Prep'];

			var id = 0;
			function createID()
			{
				return id++;
			}

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
						id: createID(),
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

			function removeClient(client)
			{
				_.remove(clients, function(existingClient){return existingClient.id === client.id;});
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
				removeClient: removeClient,
				addRandom: addRandomClient
			};
		});