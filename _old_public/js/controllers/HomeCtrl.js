/*global angular:false */
'use strict';
angular.module('myApp.controllers').controller('HomeCtrl', ['$scope', 'Global',
	function ($scope, Global)
{
	$scope.global = Global;
}]);