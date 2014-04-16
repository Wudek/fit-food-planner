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

//		function changeToDiet()
//		{
//			$scope.isCurrentDiet = true;
//			$scope.isLikes = $scope.isDislikes = $scope.isHistory = false;
//		}
//
//		function changeToLikes()
//		{
//			$scope.isLikes = true;
//			$scope.isCurrentDiet = $scope.isDislikes = $scope.isHistory = false;
//		}
//
//		function changeToDislikes()
//		{
//			$scope.isDislikes = true;
//			$scope.isCurrentDiet = $scope.isLikes = $scope.isHistory = false;
//		}
//
//		function changeToHistory()
//		{
//			$scope.isHistory = true;
//			$scope.isCurrentDiet = $scope.isLikes = $scope.isDislikes = false;
//		}
		//		$scope.changeToDiet = changeToDiet;
		//		$scope.changeToLikes = changeToLikes;
		//		$scope.changeToDislikes = changeToDislikes;
		//		$scope.changeToHistory = changeToHistory;
		//		changeToDiet();

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

		$scope.changeToCurrentDietDetails = changeToCurrentDietDetails;
		$scope.changeToCurrentDietMealBreakdown = changeToCurrentDietMealBreakdown;

		changeToCurrentDietDetails();

		$scope.clientDiet = $scope.client.getCurrentDiet();
		$scope.foods = proxyClientService.getFoods();
	});