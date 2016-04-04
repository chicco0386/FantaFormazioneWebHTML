(function() {

	var app = angular.module('fantaApp', [ 'ngResource' ]);
	
	app.directive("header", function() {
	    return {
	        templateUrl : "../pages/header.html"
	    };
	});
	
	app.directive("footer", function() {
	    return {
	        templateUrl : "../pages/footer.html"
	    };
	});

	app.run(function($rootScope) {
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
	
	function stagioniCombo(code, value){
		this.code = code;
		this.value = value;
	};

	app.controller("stagioniCtrl", function($scope, $log, stagioniFactory) {
		$scope.stagioniComboSel = null;
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
		
		$scope.notSelected = function() {
			$log.log('null' == $scope.stagioniComboSel);
			return 'null' == $scope.stagioniComboSel;
		}
		
	});
})();