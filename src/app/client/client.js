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
	});