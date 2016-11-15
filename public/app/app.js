var options = {};
options.api = {};
options.api.base_url = "http://10.66.55.27:4567"; //change if other url

var hostApp = angular.module('hostApp', ['ngRoute']);

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
hostApp.controller('mainController', function($scope, AccMeasurementService) {

 	$scope.message = 'Welcome to our home web server!';
	setInterval(function() {
		AccMeasurementService.listAll().success(function(accMeasurements){
			$scope.accMeasurements = accMeasurements;
			console.log("accmeasurements:");
			console.log(accMeasurements);
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