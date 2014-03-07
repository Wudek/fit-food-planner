angular.module( 'client', [])
	.config(function() {})
	.controller( 'ClientCtrl', function ( $scope, $routeParams, proxyClientService) {

		var clientID = parseInt($routeParams.id);

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

		$scope.isCurrentDiet = true;
		$scope.isLikes = false;
		$scope.isDislikes = false;
		$scope.isHistory = false;

		$scope.changeToDiet = function()
		{
			$scope.isCurrentDiet = true;
			$scope.isLikes = false;
			$scope.isDislikes = false;
			$scope.isHistory = false;
		};

		$scope.changeToLikes = function()
		{
			$scope.isCurrentDiet = false;
			$scope.isLikes = true;
			$scope.isDislikes = false;
			$scope.isHistory = false;
		};

		$scope.changeToDislikes = function()
		{
			$scope.isCurrentDiet = false;
			$scope.isLikes = false;
			$scope.isDislikes = true;
			$scope.isHistory = false;
		};

		$scope.changeToHistory = function()
		{
			$scope.isCurrentDiet = false;
			$scope.isLikes = false;
			$scope.isDislikes = false;
			$scope.isHistory = true;
		};

	});