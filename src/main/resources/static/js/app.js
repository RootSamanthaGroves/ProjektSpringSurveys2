// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

myApp.config(function ($routeProvider) {
    $routeProvider


        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'SurveysController'
        })
        .when('/sign', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/login2', {
            templateUrl: 'views/login2.html',
            controller: 'LoginController'
        })
        .when('/surveys', {
            templateUrl: 'views/surveys.html',
            controller: 'SurveysController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .when('/sendMassage', {//ok
            templateUrl: 'views/sendMessage.html',
            controller: 'SendMessageController'
        })
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'AccountController'
        })
        .when('/questions/:id', {
            templateUrl: 'views/questionsr.html',
            controller: 'SurveysController'
        })
        .when('/createSurvey', {
            templateUrl: 'views/createSurvey.html',
            controller: 'CreateSurveyController'
        })

        .otherwise({redirectTo: '/'});
});
