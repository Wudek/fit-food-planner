angular.module( 'ngBoilerplate', [
		'ui.state',
		'placeholders',
		'ui.bootstrap'
	])

	.config(function config( $stateProvider ) {
		$stateProvider.state( 'about', {
			url: '/home',
			views: {
				'main': {
					controller: 'HomeCtrl'
				}
			},
			data:{ pageTitle: 'Home' }
		});
	})

	.controller( 'HomeCtrl', function AboutCtrl( $scope ) {
		$scope.dropdownDemoItems = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	})

;