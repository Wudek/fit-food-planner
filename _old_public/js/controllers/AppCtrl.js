/*global angular:false */
'use strict';
angular.module('myApp.controllers').controller('AppCtrl', ['$scope', 'Global', 'Items',
	function ($scope, Global, Items)
{
	$scope.global = Global;

	$scope.test = function()
	{
		Items.get();
	};
}]);