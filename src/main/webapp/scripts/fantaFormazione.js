(function() {

	var app = angular.module('fantaApp', [ 'ngResource' ]);

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
		$scope.stagioniSelected = null;
		$scope.stagioniSel = [];
		var stagioniResponse = stagioniFactory.query();
		stagioniFactory.query(function(data) {
			$log.log(angular.isArray(data));
			angular.forEach(data, function(item) {
				if (item.code) {
					var toInsert = new stagioniCombo(item.code, item.value);
		            $scope.stagioniSel.push(toInsert);
		        }
			});
		});
	});
})();