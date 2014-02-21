angular.module( 'ffp',[
		'ngRoute',
		'services',
		'home',
		'about',
		'clients',
		'client'])

	.config( function ( $routeProvider) {
		$routeProvider
			.when('/', {templateUrl: '/partials' + '/home'})
			.when('/clients', {templateUrl: '/partials' + '/clients'})
			.when('/about', {templateUrl: '/partials' + '/about'})
			.when('/client', {templateUrl: '/partials' + '/client'})
			.otherwise({templateUrl: '/partials' + '/404'});
//			.when('/:name',{
//				templateUrl:function(parameters)
//				{
//					var url = '/partials';
//					function addParameter(string){
//						if(string)
//						{
//							url = url.concat('/' + string);
//						}
//					}
//					addParameter(parameters.name);
//					addParameter(parameters.id);
//					return url;
//				}})
//			.when('/', {redirectTo:'/home'});
	})

	.run( function () {	})

	.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) { })
;