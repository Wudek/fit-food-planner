/*global angular:false */
'use strict';

angular.module('myApp.services').factory('Items', ['$resource', function($resource) {
	return $resource('/items');
}]);