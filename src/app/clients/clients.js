angular.module( 'clients', [])
	.config(function() {})
	.controller( 'ClientsCtrl', function ( $scope ) {
		$scope.dropdownDemoItems = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	});