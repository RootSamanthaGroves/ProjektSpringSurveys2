// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);


myApp.config(function ($routeProvider) {
    $routeProvider


        .when('/sign', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/login', {
            templateUrl: 'views/login2.html',
            controller: 'LoginController'
        })



        .otherwise({redirectTo: '/'});
});


