/*global angular:false */
'use strict';
angular.module('myApp.controllers').controller('CONTROLLER_NAME', ['$scope', 'Global',
	function ($scope, Global)
{
	$scope.global = Global;
}]);