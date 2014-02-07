/*global angular:false */
'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
		'ngResource',
		'ngRoute',
		'myApp.filters',
		'myApp.services',
		'myApp.directives',
		'myApp.controllers'
	]).config(['$routeProvider', function ($routeProvider)
	{
		$routeProvider.when('/items', {templateUrl : 'partials/items', controller : 'ItemsCtrl'});
		$routeProvider.when('/login', {templateUrl : 'partials/login', controller : 'LoginCtrl'});
		$routeProvider.when('/', {templateUrl : 'partials/home', controller : 'HomeCtrl'});
		$routeProvider.otherwise({redirectTo : '/'});
	}]);

angular.module('myApp.filters', []);
angular.module('myApp.services', []);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', []);