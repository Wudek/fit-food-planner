angular.module('directives')
	.directive('zClientProfileCard', function ()
	{
		return {
			restrict    : 'AE',
			scope       : {client : '='},
			templateUrl : 'directives/zClientProfileCard'
		};});