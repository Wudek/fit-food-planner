angular.module('directives')
	.directive('zDietDetails', function ()
	{
		function link($scope, element, attributes)
		{
		}

		return {
			restrict    : 'AE',
			scope       : {
				diet : '='},
			link        : link,
			templateUrl : 'directives/zDietDetails'
		};
	});