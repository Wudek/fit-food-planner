angular.module( 'home', [])

	.config(function() {})

	.controller( 'HomeCtrl', function ( $scope ) {
		$scope.dropdownDemoItems = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	});