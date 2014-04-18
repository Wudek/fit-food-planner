angular.module('directives')
	.directive('quantityFormat', ['$filter', function ($filter) {
		return {
			require: '?ngModel',
			link: function (scope, elem, attrs, ctrl) {
				if (!ctrl)
				{
					return;
				}
				//see http://stackoverflow.com/questions/19890364/format-input-value-in-angularjs

				ctrl.$formatters.unshift(function (a) {
					var filteredValue = $filter('number')(ctrl.$modelValue, 2);
					return Number(S(filteredValue).replaceAll(',',''));
				});

			}
		};
	}]);