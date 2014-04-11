angular.module( 'ffp',[
		'ngRoute',
		'services',
		'directives',
		'home',
		'about',
		'clients',
		'client'])

	.config( function ( $routeProvider) {
		$routeProvider
			.when('/', {templateUrl: '/views' + '/home'})
			.when('/clients', {templateUrl: '/views' + '/clients'})
			.when('/about', {templateUrl: '/views' + '/about'})
			.when('/client/:id', {templateUrl: '/views' + '/client'})
			.otherwise({templateUrl: '/views' + '/404'});
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

	.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) { });

angular.module('services', []);
angular.module('directives', []);