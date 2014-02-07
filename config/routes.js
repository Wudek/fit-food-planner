'use strict';

module.exports = function (app)
{

	var index = require('../server/controllers/index');
	app.get('/', index.index);
	app.get('/partials/:name', index.partials);

//	var items = require('../server/controllers/itemsController');
//	app.get('/items', items.getAll);
};