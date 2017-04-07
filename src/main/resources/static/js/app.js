// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);


myApp.config(function ($routeProvider) {
    $routeProvider


        .when('/sign', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/', {
            templateUrl: 'views/content.html',
            controller: 'SurveysController'
        })
        // .when('/login', {
        //     templateUrl: 'views/login.html',
        //     controller: 'LoginController'
        // })
        .when('/user/account', {
            templateUrl: 'views/user-account.html',
            controller: 'AccountController'
        })



        .otherwise({redirectTo: '/'});
});


