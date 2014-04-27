var Client = require("./dbSchema").Client;

module.exports.createClient = function (name, male, height, weight)
{
	var clientObj = new Client(
		{
			name   : name,
			male   : male,
			height : height,
			weight : weight,
			diet   : {
				meals : []
			}
		});
	clientObj.save();
};

module.exports.listClients = function()
{
	Client.find().exec(function(err, clients)
	{
	});
};