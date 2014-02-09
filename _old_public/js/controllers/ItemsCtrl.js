/*global angular:false */
'use strict';
angular.module('myApp.controllers').controller('ItemsCtrl', ['$scope', 'Global',
	function ($scope, Global)
{
	$scope.global = Global;
}]);