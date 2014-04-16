angular.module('directives')
	.directive('zEditDiet', function ()
	{
		function link($scope, element, attributes)
		{
		}

		return {
			restrict    : 'AE',
			scope       : {
				foods : '=',
				diet : '='},
			link        : link,
			templateUrl : 'directives/zEditDiet'
		};
	});