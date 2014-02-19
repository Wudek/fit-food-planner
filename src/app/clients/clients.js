angular.module( 'clients', [])
	.config(function() {})
	.controller( 'ClientsCtrl', function ( $scope , proxyClientService) {

		$scope.clients = proxyClientService.getClients();
		$scope.addRandom = proxyClientService.addRandom;
		$scope.categories = proxyClientService.getClientCategories();

		var defaultFilter = function()
		{
			return {
				name: '',
				isMale: 'true',
				isFemale: 'true',
				category: ''
			};
		}
		$scope.filter = defaultFilter();
		$scope.clearFilter = function()
		{
			$scope.filter = defaultFilter();
		};

		$scope.filterBy = function()
		{
			return function(client)
			{
				if(S($scope.filter.name).isEmpty() === false && S(client.name.toUpperCase()).contains($scope.filter.name.toUpperCase()) === false)
				{
					return false;
				}
				if(S($scope.filter.category).isEmpty() === false && client.category !== $scope.filter.category)
				{
					return false;
				}
				return (client.isMale && $scope.filter.isMale) || (client.isMale === false && $scope.filter.isFemale);
			};
		};
	});