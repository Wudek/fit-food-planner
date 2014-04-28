var Client = require("./dbSchema").Client;
var Promise = require('bluebird');

var createClient = module.exports.createClient = function (name, male, height, weight)
{
	var client = new Client(
		{
			name   : name,
			male   : male,
			height : height,
			weight : weight,
			diet   : {
				meals : []
			}
		});
	return new Promise(function(resolve, reject)
	{
		Client.create(client, function(err, client)
		{
			err ? reject(err) : resolve(client);
		});
	});
};

var createClientIfNameDoesNotExist = module.exports.createClientIfNameDoesNotExist = function (name, male, height, weight)
{
	return new Promise(function(resolve, reject)
	{
		findClientByName(name).then(function(existingClient)
		{
			if(existingClient)
			{
				resolve(existingClient);
			}
			else
			{
				createClient(name, male, height, weight).then(function(newClient)
				{
					resolve(newClient);
				});
			}
		});
	});
};

var listClients = module.exports.listClients = function()
{
	return new Promise(function(resolve, reject)
	{
		Client.find({}, function(err, clients)
		{
			err ? reject(err) : resolve(clients);
		});
	});
};

var findClientByName = module.exports.findClientByName = function(name)
{
	return new Promise(function(resolve,reject)
	{
		Client.findOne({name:name}, function(err, client)
		{
			err ? reject(err) : resolve(client);
		});
	});
};


var clearClients = module.exports.clearClients = function()
{
	return Client.remove().exec();
};
