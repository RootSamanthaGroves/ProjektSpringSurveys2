/**
 * Created byDominika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http, $rootScope) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;


    $rootScope.loadAllSurveyFromDb = function () {
        var Survey = $resource('survey/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Survey.query(function (response) {
            $scope.survey = response;
        });
    };
    $rootScope.loadAllSurveyFromDb();



    $scope.saveSurvey = function () {
        var title = $scope.titleOfSurvey; //pobieramy imie z pola w html


        alert(title);


        var titleObj = {
            title: title

        };

        $http.post('/survey/add', titleObj).success(function () { //wywloujemy
            alert('Survey add' + titleObj);
            $rootScope.loadAllSurveyFromDb();
        }).error(function () {
            alert('We have problem!');
        })
    };

});