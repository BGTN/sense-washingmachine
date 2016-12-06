var options = {};
options.api = {};
options.api.base_url = "http://10.66.61.207:4567"; //change if other url

var hostApp = angular.module('hostApp', ['ngRoute', 'timer']);

hostApp.config(function($routeProvider) {
 $routeProvider

 // route for the home page
 .when('/', {
 templateUrl : 'app/home/home.html',
 controller : 'mainController'
 })

 // route for the analysis page
 .when('/analysis', {
 templateUrl : 'app/analysis/analysis.html',
 controller : 'analysisController'
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

		WashingMachineService.listAll().success(function(washingMachines){
			$scope.washingMachines=[];
			// todo change starttime to washingmachine.starttime
			washingMachines.forEach(function(wm){
				var starttime;
				var now = new Date();
				var runningTimespanInMilliseconds = 57*60*1000;

				if (wm.starttime !== (null || "" || undefined)) {
					var start = new Date(wm.starttime);
					starttime = now - start;
					starttime = runningTimespanInMilliseconds - (starttime);
					starttime = starttime / (1000);
				} else {
					var start = new Date(wm.updated);
					starttime = now - start;
					starttime = runningTimespanInMilliseconds - (starttime);
					starttime = starttime / (1000);
				}

				wm.starttime = starttime;
				$scope.washingMachines.push(wm);
			});
			//$scope.washingMachines = washingMachines;
			console.log("washingmachines:");
			console.log(washingMachines);
		}).error(function(err){
			console.log(err);
		});
		
	}, 3000);
});

//controllers
hostApp.controller('analysisController', function($scope, AccMeasurementService, WashingMachineService) {
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
			// todo change starttime to washingmachine.starttime
			washingMachines.forEach(function(wm){
				var starttime;
				var now = new Date();
				var runningTimespanInMilliseconds = 57*60*1000;

				if (wm.starttime !== (null || "" || undefined)) {
					var start = new Date(wm.starttime);
					starttime = now - start;
					starttime = runningTimespanInMilliseconds - (starttime);
					starttime = starttime / (1000);
				} else {
					var start = new Date(wm.updated);
					starttime = now - start;
					starttime = runningTimespanInMilliseconds - (starttime);
					starttime = starttime / (1000);
				}

				wm.starttime = starttime;
				$scope.washingMachines.push(wm);
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