(function() {

	var app = angular.module('fantaApp', ['ngResource']);

	app.run(function($rootScope) {
		$rootScope.logged = true;
	});

	app.factory("stagioniFactory",	function($http, $resource) {
		$http.defaults.useXDomain = true;
		return $resource("http://localhost:8080/FantaWebService/giornateRESTImpl/getStagioniAll");
	});

	app.controller("stagioniCtrl", function($scope, stagioniFactory) {
		stagioniFactory.query(function(data) {
			$scope.stagioni = data;
		});
	});

})();