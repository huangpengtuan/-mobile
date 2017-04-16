/**
 * Created by htp on 2016/10/26.
 */
(function (angular) {
	//由于默认angular提供的异步请求对象不支持自定义回调函数名
	//angular随机分配的回调函数名称不被豆瓣支持，所以需要自己写一个服务
	var http=angular.module('movieCat.servision.http',[]);

	http.service('HttpService',['$window','$document', function ($window,$document) {
		this.jsonp = function (url, data,callback) {


			var querystring = url.indexOf('?') == -1 ? '?':'&' ;
			for(var key in data){
				querystring += key + '=' + data[key] + '&';
			}
			var cbfunname = 'my_json_cb_'+Math.random().toString().replace('.','');
			querystring += 'callback=' + cbfunname;

			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;

			//回调函数
			$window[cbfunname] = function (data) {

				//执行回调函数
				callback(data);



				//为防止在界面上留下太多jsonp代码，使用callback执行完之后就自动删除自己
				$document[0].body.removeChild(scriptElement);
			};
			$document[0].body.appendChild(scriptElement);
		};

	}])
})(angular);




//(function(window,document,undefined){
//	var jsonp = function (url, data,callback) {
//
//		//0.将data转换为URl字符串的形式{id:1,name:zhang}>id=1&name=zhang
//		//检索？出现的位置，有？则返回？所在的位数，没有则返回-1，
//		var querystring = url.indexOf('?') == -1 ? '?':'&' ;
//		for(var key in data){
//			//data为自己要想服务器传递的数据
//			querystring += key + '=' + data[key] + '&';
//			//得到  ?id=1&name=zhang&
//		}
//
//		//1.处理url中的回调参数
//		//url+=callback=sfhkjadflkja
//
//		var cbfunname = 'my_json_cb_'+Math.random().toString().replace('.','');
//		//得到  my_json_cb_45465455
//		querystring+= 'callback='+cbfunname;
//		//querystring 此时等于 ?id=1&name=zhang&callback=my_json_cb_45465455
//
//		//2.创建一个script标签
//		var scriptElement = $document.createElement('script');
//		scriptElement.src = url + querystring;
//		//注意，此时话不能将这个script标签append到页面上去，放上去就会里面执行了，而这个回调函数还没准备好
//
//		//3.将script标签放到页面中
//		//-1.挂载回调函数,吧callback挂到全局上
//
//		window[cbfunname] = function (data) {
//			//执行回调函数
//			callback(data);
//			//为防止在界面上留下太多jsonp代码，使用callback执行完之后就自动删除自己
//			$document[0].body.removeChild(scriptElement);
//		};
//		$document[0].body.appendChild(scriptElement);
//	}
//		//挂在之后，回调函数为  my_json_cb_45465455  相当于一个function，可以在window里运行
//		document.body.appendChild(scriptElement);
//
//		//append后页面会自动对这个地址发送请求
//
//});





























