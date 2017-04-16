(function(angular){
	'use strict';
	angular.module('moviedetail',[
		'ngRoute',
		'movieCat.servision.http'
	])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/detail/:id',{
			templateUrl:'moviedetail/moviedetail.html',
			controller:'moviedetailCtl'
		})
	}])
	.controller('moviedetailCtl',[
		'$scope',
		'$location',
		'$routeParams',
		'HttpService',
		function($scope,$location,$routeParams,HttpService){

//			设计数据
			$scope.movie={};
			$scope.loading=false
			HttpService.jsonp('http://api.douban.com/v2/movie/subject/'+ $routeParams.id,
				{},
				function (data) {
					$scope.movie =data;
					$scope.loading=true;
					$scope.$apply();
			});

			
	}])
	
	
})(angular)