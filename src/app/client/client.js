angular.module( 'client', [])
	.config(function() {})
	.controller( 'ClientCtrl', function ( $scope, $routeParams, proxyClientService) {

		var clientID = parseInt($routeParams.id);

		$scope.rating = 5;
		$scope.isLoading = true;
		$scope.client = proxyClientService.getClient(clientID);

		proxyClientService.fetchClientDetails(clientID).then(
			function(clientDetails)
			{
				$scope.clientDetails = clientDetails;
				$scope.isLoading = false;
				$scope.$digest();
			}
		);

		function changeToDiet()
		{
			$scope.isCurrentDiet = true;
			$scope.isLikes = $scope.isDislikes = $scope.isHistory = false;
		}

		function changeToLikes()
		{
			$scope.isLikes = true;
			$scope.isCurrentDiet = $scope.isDislikes = $scope.isHistory = false;
		}

		function changeToDislikes()
		{
			$scope.isDislikes = true;
			$scope.isCurrentDiet = $scope.isLikes = $scope.isHistory = false;
		}

		function changeToHistory()
		{
			$scope.isHistory = true;
			$scope.isCurrentDiet = $scope.isLikes = $scope.isDislikes = false;
		}

		function changeToCurrentDietDetails()
		{
			$scope.currentDietDetails = true;
			$scope.currentDietMealBreakdown = false;
		}

		function changeToCurrentDietMealBreakdown()
		{
			$scope.currentDietDetails = false;
			$scope.currentDietMealBreakdown = true;
		}

		$scope.changeToDiet = changeToDiet;
		$scope.changeToLikes = changeToLikes;
		$scope.changeToDislikes = changeToDislikes;
		$scope.changeToHistory = changeToHistory;
		$scope.changeToCurrentDietDetails = changeToCurrentDietDetails;
		$scope.changeToCurrentDietMealBreakdown = changeToCurrentDietMealBreakdown;

		changeToDiet();
		changeToCurrentDietMealBreakdown();


		$scope.chartData =  [
			{
				"country": "USA",
				"visits": 4025
			},
			{
				"country": "China",
				"visits": 1882
			},
			{
				"country": "Japan",
				"visits": 1809
			},
			{
				"country": "Germany",
				"visits": 1322
			},
			{
				"country": "UK",
				"visits": 1122
			},
			{
				"country": "France",
				"visits": 1114
			},
			{
				"country": "India",
				"visits": 984
			},
			{
				"country": "Spain",
				"visits": 711
			},
			{
				"country": "Netherlands",
				"visits": 665
			},
			{
				"country": "Russia",
				"visits": 580
			},
			{
				"country": "South Korea",
				"visits": 443
			},
			{
				"country": "Canada",
				"visits": 441
			},
			{
				"country": "Brazil",
				"visits": 395
			},
			{
				"country": "Italy",
				"visits": 386
			},
			{
				"country": "Australia",
				"visits": 384
			},
			{
				"country": "Taiwan",
				"visits": 338
			},
			{
				"country": "Poland",
				"visits": 328
			}
		];

	});