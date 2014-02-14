angular.module( 'ffp',[
		'ngRoute',
		'services',
		'home',
		'about',
		'clients'])

	.config( function ( $routeProvider) {
		$routeProvider
			.when('/:name',{
				templateUrl:function(parameters)
				{
					return '/partials/' + parameters.name;
				}})
			.otherwise({redirectTo:'/home'});
	})

	.run( function () {	})

	.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) { })
;