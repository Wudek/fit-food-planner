angular.module( 'client', [])
	.config(function() {})
	.controller( 'ClientCtrl', function ( $scope, $filter, $routeParams, proxyClientService) {

		var clientID = parseInt($routeParams.id);

		var client = $scope.client = proxyClientService.getClient(clientID);
		var foods = $scope.foods = proxyClientService.getFoods();
		var diet = $scope.diet = $scope.client.diet;

		$scope.dietDetailsView = true;
		$scope.dietChartsView = false;
		$scope.clientInfoView = false;

		$scope.toDietDetails= () => {
			$scope.dietDetailsView = true;
			$scope.dietChartsView = false;
			$scope.clientInfoView = false;
		};
		$scope.toDietCharts = () => {
			$scope.dietDetailsView = false;
			$scope.dietChartsView = true;
			$scope.clientInfoView = false;
		};
		$scope.toClientInfo = () => {
			$scope.dietDetailsView = false;
			$scope.dietChartsView = false;
			$scope.clientInfoView = true;
		};

		$scope.addEmptyMeal = () => proxyClientService.addEmptyMeal(diet);
		$scope.addRandomMeal = () => proxyClientService.addRandomMeal(diet);
		$scope.clearDiet = () => diet.clearMeals();
		$scope.exportDiet = function()
		{
			var fileName = S(client.name.concat(' diet')).slugify().s;
			fileName = 'diet';
			var fileExt = '.txt';
			var filedata = JSON.stringify(diet);
			filedata = getDietDetails();
			var fileContent = new Blob([filedata], {type: 'text/plain;charset=utf-8'});
			saveAs(fileContent, fileName + fileExt);
		};

		function getDietDetails()
		{
			var result = '';
			var filterIt = function(value)
			{
				return S($filter('number')(value, 1)).replaceAll(',','').s;
			};
			diet.meals.forEach(function(meal){

				result += meal.name;
				result += ',,,';
				result += filterIt(meal.carbs) + ',';
				result += filterIt(meal.protein) + ',';
				result += filterIt(meal.fats) + ',';
				result += filterIt(meal.calories);
				result += '\n';
				meal.foodItems.forEach(function(foodItem){
					result += foodItem.food.name + ',';
					result += foodItem.quantity + ',';
					result += foodItem.quantityType + ',';
					result += foodItem.carbs + ',';
					result += foodItem.protein + ',';
					result += foodItem.fats + ',';
					result += foodItem.calories;
					result += '\n';
				});
			});
			result += 'total,,,';
			result += filterIt(diet.carbs) + ',';
			result += filterIt(diet.protein) + ',';
			result += filterIt(diet.fats) + ',';
			result += filterIt(diet.calories);
			return result;
		}


	});