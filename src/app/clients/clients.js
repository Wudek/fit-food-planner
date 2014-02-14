angular.module( 'clients', [])
	.config(function() {})
	.controller( 'ClientsCtrl', function ( $scope , proxyClientService) {

		$scope.clients = proxyClientService.getClients();
		$scope.addRandom = proxyClientService.addRandom;
	});