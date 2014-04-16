angular.module('directives')
	.directive('zEditFoodItem',function ($filter)
	{
		function filter(value)
		{
			var filteredValue = $filter('number')(value, 2);
			return Number(S(filteredValue).replaceAll(',',''));
		}

		function link($scope, element, attributes)
		{
			$scope.quantity = 0;
			$scope.$watch('foodItem.quantityType', function(newValue, oldValue){
				if(newValue !== oldValue)
				{
					$scope.foodItem.adjustQuantity(oldValue, newValue);
				}
			}, true);
			$scope.$watch('foodItem.quantity', function(){
//				var value = Number($filter('number')($scope.foodItem.quantity, 2));
//				var otherValue = quantityFilter($scope.foodItem.quantity);
				$scope.quantity = filter($scope.foodItem.quantity);
			}, true);

			$scope.changeQuantity = function()
			{
				$scope.foodItem.quantity = $scope.quantity;
			}
		}

		return {
			restrict    : 'A',
			scope       : {
				foods : '=',
				foodItem : '=zEditFoodItem'},
			link        : link,
			templateUrl : 'directives/zEditFoodItem'
		};
	});