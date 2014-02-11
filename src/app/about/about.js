angular.module( 'about', [])
	.config(function() {})
	.controller( 'AboutCtrl', function ( $scope ) {
		$scope.dropdownDemoItems = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	});