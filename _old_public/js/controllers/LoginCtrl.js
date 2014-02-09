/*global angular:false */
'use strict';
angular.module('myApp.controllers').controller('LoginCtrl', ['$scope', 'Global',
	function ($scope, Global)
{
	$scope.global = Global;
}]);