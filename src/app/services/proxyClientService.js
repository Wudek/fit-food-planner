angular.module('services', []).
	factory( 'proxyClientService',
		function()
		{
			var delay = 1000;
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

			function createClient(name, isMale)
			{
				return new Client(createID(), name, isMale, randomCategory());
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

			function getClient(clientID)
			{
				return _.find(clients, {'id': clientID});
			}

			function fetchClientDetails(clientID)
			{
				return new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						var result = getClient(clientID);
						if(result)
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

			function addRandomMaleClient()
			{
				addClient(createClient(randomMaleName(), true));
			}

			function addRandomFemaleClient()
			{
				addClient(createClient(randomFemaleName(), false));
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
				getClient: getClient,
				fetchClientDetails: fetchClientDetails,
				addRandom: addRandomClient
			};
		});