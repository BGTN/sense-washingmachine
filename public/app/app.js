var options = {};
options.api = {};
options.api.base_url = "http://10.66.111.32:4567"; //change if other url

var hostApp = angular.module('hostApp', ['ngRoute', 'timer']);

hostApp.config(function($routeProvider) {
 $routeProvider

 // route for the home page
 .when('/', {
 templateUrl : 'app/home/home.html',
 controller : 'mainController'
 })

 // route for the about page
 .when('/about', {
 templateUrl : 'app/about/about.html',
 controller : 'aboutController'
 });
});

//controllers
hostApp.controller('mainController', function($scope, AccMeasurementService, WashingMachineService) {
	$scope.washingMachines = [];

	setInterval(function() {
		AccMeasurementService.listAll().success(function(accMeasurements){
			$scope.accMeasurements = accMeasurements;
			console.log("accmeasurements:");
			//console.log(accMeasurements);
		}).error(function(err){
			console.log(err);
		});

		WashingMachineService.listAll().success(function(washingMachines){
			$scope.washingMachines=[];
			washingMachines.forEach(function(am){
				var runningTimespanInMilliseconds = 500*60*1000;
				var now = new Date();
				var start = new Date(am.updated);
				var starttime = now - start;
				starttime = runningTimespanInMilliseconds - (starttime/1000);
				am.starttime = starttime;
				$scope.washingMachines.push(am);
			});
			//$scope.washingMachines = washingMachines;
			console.log("washingmachines:");
			console.log(washingMachines);
		}).error(function(err){
			console.log(err);
		});
		
	}, 3000);
});

hostApp.controller('aboutController', function($scope) {
 $scope.message = 'This is the about page.';
});

//services
hostApp.factory('AccMeasurementService', function($http) {

	return {
		
		listAll: function() {
			return $http.get(options.api.base_url + '/accmeasurement/listAll');
		}
	};

});

hostApp.factory('WashingMachineService', function($http) {

	return {
		
		listAll: function() {
			return $http.get(options.api.base_url + '/washingmachine/listAll');
		}
	};

});