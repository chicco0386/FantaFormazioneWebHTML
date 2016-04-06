(function() {

	var app = angular.module('fantaApp', [ 'ngRoute', 'ngResource' ]);

//	app.config(function($routeProvider, $locationProvider) {
//		$routeProvider.when('/', {
//			templateUrl : 'pages/home.html',
//			controller : mainCtrl
//		}).when('/statistiche', {
//			templateUrl : 'pages/statistiche.html',
//			controller : mainCtrl
//		}).when('/creaFormazione', {
//			templateUrl : 'pages/creaFormazione.html.html',
//			controller : mainCtrl
//		});
//
//		// use the HTML5 History API
//		$locationProvider.html5Mode(true);
//	});

	app.run(function($rootScope) {
		$rootScope.stagioniComboSel = null;
		$rootScope.logged = true;
	});

	app.factory("stagioniFactory", function($http, $resource) {
		$http.defaults.useXDomain = true;
		return $resource("http://localhost:8080/FantaWebService/giornateRESTImpl/getStagioniAll", {}, {
			query : {
				method : 'get',
				isArray : true
			}
		});
	});

	function stagioniCombo(code, value) {
		this.code = code;
		this.value = value;
	}
	;

	app.controller("mainCtrl", function($rootScope, $scope, $log, stagioniFactory) {
		$scope.stagioniCombo = [];
		var stagioniResponse = stagioniFactory.query();
		stagioniFactory.query(function(data) {
			angular.forEach(data, function(item) {
				if (item.code) {
					var toInsert = new stagioniCombo(item.code, item.value);
					$scope.stagioniCombo.push(toInsert);
				}
			});
		});

		$rootScope.resetStagione = function() {
			$log.log("resetStagione");
			$rootScope.stagioniComboSel = "";
		};
	});
})();