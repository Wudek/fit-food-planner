angular.module('directives')
	.directive('zClientInfo', function ()
	{
		return {
			restrict    : 'AE',
			scope       : {client : '='},
			templateUrl : 'directives/zClientInfo'
		};});