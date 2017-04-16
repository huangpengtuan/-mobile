(function(angular){
	'use strict';
	angular.module('moivecat',[
		'ngRoute',
		'movieCat.servision.http'
	])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/:movielist/:page',{
			templateUrl:'moviecat/moviecat.html',
			controller:'moviecatCtl'
		})
	}])
	.controller('moviecatCtl',[
		'$scope',
		'$location',
		'$routeParams',
		'HttpService',
		'$route',
		function($scope,$location,$routeParams,HttpService,$route){
			var count=8;     //每页有多少条
			var page=parseInt($routeParams.page);    //页码
			var start=(page-1)*count;    //当前页从哪里开始
//			设计数据
			$scope.subjects={};
			$scope.totalPages=0;
			$scope.totalcount=0;
			$scope.loading=false;
			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movielist,
				{start:start,count:count,q:$routeParams.q},
				function (data) {
					$scope.subjects =data.subjects;
					$scope.loading=true;
					$scope.totalcount=data.total;
					$scope.currentPage = page;
					$scope.totalPages=Math.ceil($scope.totalcount/count);
					// 瀑布流插件
					$('#container').imagesLoaded(function(){
						$('#container').isotope({  
					  		// options  
						  	itemSelector : '.item',  
						  	layoutMode : 'fitRows'  
						});  
					});
					$scope.$apply();
			});

            //暴露行为
			$scope.go= function (page) {
			//传过来第几页我就跳第几页去
			//需要验证页数的合法范围
				if(page >= 1 && page <= $scope.totalPages){
	
					//$route.updateParams（{？：！}）更新路由上？值，把变化的！给？{？：！}可以按照自己需要设定条件
					$route.updateParams({page:page});
					
				}
			};


			
	}])
	
	
})(angular)