'use strict';

angular.module('infoboxApp.controllers.List', ['meumobi.api'])

.controller('ListController', function($rootScope, $scope, Items, SyncNews, AppFunc, $timeout) {
	
	$scope.items = $rootScope.newsList;
	
	// Use it if Stub
	//$scope.items = Items.latest();
	//$rootScope.loading = false;
	
	/*Items.latest(
		function(data) {
			$rootScope.loading = false;
			localStorage['newsList'] = JSON.stringify(data.items);
			$scope.items = data.items;
		},
		function(error, status) {
			$rootScope.loading = false;
			// TODO: Display an error msg and invite to retry
			// error and status come empty. Should investigate
			console.log(status);
			console.log("Request Failed:" + error);
		}
	);*/

	$scope.listItems = function(){
		SyncNews.get(function(resp, success){
			$timeout(function(){
				$rootScope.loading = false;
			},300);
			if(success){
				$scope.items = resp;
			}else{
				AppFunc.toast("Erro ao sincronizar notícias");
				$scope.items = localStorage.hasOwnProperty('newsList') ? JSON.parse(localStorage['newsList']) : [];
			}
		});
	}

  AppFunc.initPushwoosh();

	$scope.getImage = function(id){
		/*if(localStorage["image_"+id]){
			return localStorage["image_"+id];
		}*/
		return 'http://int-meumobi.com/'+id;
	}

	$scope.listItems();
	
});

 