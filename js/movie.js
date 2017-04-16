'use strict'

//简历全局模块
angular.module('myapp',[
//	模块起名为movieCat，它依赖的模块为:
	'ngRoute',
	'movieCat.servision.http',
	'moviedetail',
	'moivecat',
	
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
//		.when('/:movielist/:page',{
//			templateUrl:'moviecat/moviecat.html',
//			controller:'moviecatCtl'
//		})
//		.when('/detail/:id',{
//			templateUrl:'moviedetail/moviedetail.html',
//			controller:'moviedetailCtl'
//		})
		.otherwise({redirectTo:'/in_theaters/1'});
	}])

	.controller('movieapp',[
		'$scope',
		'$location',
		'$routeParams',
		function($scope,$location,$routeParams){
			$scope.$location = $location;
			$scope.type='';
			$scope.$watch('$location.path()', function (now) {
				if(now.startsWith('/in_theaters')){
					$scope.type='in_theaters';
				}else if(now.startsWith('/coming_soon')){
					$scope.type='coming_soon';
				}else if(now.startsWith('/top250')){
					$scope.type='top250';
	
				}
			})
		console.log($routeParams);
		
	}])
