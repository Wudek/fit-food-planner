angular.module( 'client', [])
	.config(function() {})
	.controller( 'ClientCtrl', function ( $scope, $routeParams, proxyClientService) {

		var clientID = parseInt($routeParams.id);

		$scope.rating = 5;
//		$scope.isLoading = true;
		$scope.client = proxyClientService.getClient(clientID);

//		proxyClientService.fetchClientDetails(clientID).then(
//			function(clientDetails)
//			{
//				$scope.clientDetails = clientDetails;
//				$scope.isLoading = false;
//				$scope.$digest();
//			}
//		);

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

		$scope.foods = proxyClientService.getFoods();
		$scope.diet = $scope.client.getCurrentDiet();
		$scope.addEmptyMeal = () => proxyClientService.addEmptyMeal($scope.diet);
		$scope.addRandomMeal = () => proxyClientService.addRandomMeal($scope.diet);
		$scope.clearDiet = () => $scope.diet.clearMeals();
	});