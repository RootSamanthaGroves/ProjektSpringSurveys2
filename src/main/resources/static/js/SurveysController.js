/**
 * Created byDominika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http, $rootScope, SurveyService) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;
    $scope.idSurvey;
    $scope.ankietka;
    $scope.questions;
    $scope.answer;

    var loadAllQuestionFromDb = function () {
        var Survey = $resource('question/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Survey.query(function (response) {
            $scope.questions = response;
        });
    };
    loadAllQuestionFromDb();

    $rootScope.loadAllSurveyFromDb = function () {
        var Survey = $resource('survey/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Survey.query(function (response) {
            $scope.survey = response;
        });
    };
    $rootScope.loadAllSurveyFromDb();


    $scope.delete = function (Id) {
        alert("The Survey Deleted Successfully!!! Please refresh the page ");

        $http({
            method: 'DELETE',
            url: '/survey/delete/id/' + Id
        }).success(function (data) {
            //Showing Success message
            $scope.status = "The Survey Deleted Successfully!!!";
            alert('Delete User');
            loadAllSurveyFromDb();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }

    $scope.showQuestion = function (id) {
        alert("The Survey Deleted Successfully!!! Please refresh the page ");

        $http({
            method: 'GET',
            url: '/survey/id/' + id
        }).success(function (data) {
            //Showing Success message
            $scope.status = "The Survey Deleted Successfully!!!";
            alert('Pobieranie jednej ankiety');

        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }

    $scope.showAnswer = function (id) {
        alert("The Survey Deleted Successfully!!! Please refresh the page ");

        $http({
            method: 'GET',
            url: '/answer/id/' + id
        }).success(function (data) {
            //Showing Success message
            $scope.status = "The Survey Deleted Successfully!!!";
            alert('Pobieranie jednej odpoweidzi');

        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }


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

    $scope.loadOneSurvey = function (id) {
        $scope.idSurvey = id;
        alert("jestem w finf one" + $scope.idSurvey);
        SurveyService
            .findOneSurvey(id)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.ankietka = response.data;
                    // alert($scope.ankietka);
                }
            })
    };

    $scope.saveQuestion = function () {
        var Question = $scope.questionOfSurvey;
        alert($scope.questionOfSurvey);
        var questionObject = {
            question: Question
        };
        $http.post('/question/add', questionObject).success(function () { //wywloujemy
            alert('Thanks');
            loadAllQuestionFromDb();
            // $scope.$emit("myEvent");
        }).error(function () {
            alert('We have problem2!');
        })
    };

    $scope.saveAnswer= function () {
        var Answer = $scope.answerOfSurvey;
        alert($scope.answerOfSurvey);
        var answerObject = {
            answer: Answer
        };
        $http.post('/answer/add', answerObject).success(function () { //wywloujemy
            alert('Thanks');
            loadAllQuestionFromDb();
            // $scope.$emit("myEvent");
        }).error(function () {
            alert('We have problem2!');
        })
    };



})
// .service('myService', function(){
//
//     this.ankietka= {ankietka2:[]};
// })

;