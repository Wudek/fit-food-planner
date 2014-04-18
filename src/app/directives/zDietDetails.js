angular.module('directives')
	.directive('zDietDetails', function ()
	{
		function link($scope, element, attributes)
		{
			$scope.removeFoodItem = (meal,foodItem) => {
				meal.removeFoodItem(foodItem);
			};
			$scope.addEmptyFoodItem = (meal) =>{
				meal.addFoodItem(new FoodItem());
			};
		}


//		$scope.$watch('diet', function (diet)
//		{
//			setMeals(diet.meals);
//		});

		return {
			restrict    : 'AE',
			scope       : {
				foods : '=',
				diet : '='},
			link        : link,
			templateUrl : 'directives/zDietDetails'
		};
	});