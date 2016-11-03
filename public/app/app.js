// app.js

// create the module and name it hostApp
 // also include ngRoute for all our routing needs
var hostApp = angular.module('hostApp', ['ngRoute']);

// configure our routes
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

// create the controller and inject Angular's $scope
hostApp.controller('mainController', function($scope) {
 // create a message to display in our view
 $scope.message = 'Welcome to our home web server!';
});

hostApp.controller('aboutController', function($scope) {
 $scope.message = 'This is the about page.';
});