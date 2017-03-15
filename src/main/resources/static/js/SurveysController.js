/**
 * Created byDominika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;
    $scope.idSurvey;
    $scope.ankietka;
    $scope.questions;
    $scope.answer;
    $scope.question;

    $scope.testowy = 56;
    $scope.items = [];
    $scope.selected = [];

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };


    $scope.saveRelations = function () {
        //alert($scope.selected + " " + $scope.question);
        console.log($scope.selected + " " + $scope.question);

/*        var selectedObject = {
            selected: $scope.selected
        };*/

        var questionObject = {
            question: $scope.question,
            answers: $scope.selected
        };

        $http.post('/question/put/'+ $routeParams.id ,  questionObject).success(function () { //wywloujemy
            alert('Thanks');
            loadAllQuestionFromDb();

            // for(var i = 0; questionObject.length(); i++){
            //     console.log(questionObject.answers[i].answer);
            // }

        }).error(function () {
            alert("nie udało się ")
        })
    };

    var loadAllQuestionFromDb = function () {
        var Survey = $resource('question/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Survey.query(function (response) {
            $scope.questions = response;
        });
    };
    loadAllQuestionFromDb();


    var loadAllAnswersFromDb = function () {
        var Survey = $resource('answer/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Survey.query(function (response) {
            $scope.answer = response;
        });
    };
    loadAllAnswersFromDb();


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
    $rootScope.showAnswer = function (id) {


        $http({
            method: 'GET',
            url: '/answer/id/' + id
        }).success(function (data) {
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
        // alert($scope.questionOfSurvey);
        var questionObject = {
            question: Question
        };
        $http.post('/question/add', questionObject).success(function () { //wywloujemy
            // alert('Thanks');
            loadAllQuestionFromDb();
        }).error(function () {
            alert('We have problem2!');
        })
    };

    $scope.saveAnswer = function () {
        var Answer = $scope.answerOfSurvey;
        // alert($scope.answerOfSurvey);
        var answerObject = {
            answer: Answer
        };
        $http.post('/answer/add', answerObject).success(function () { //wywloujemy
            // alert('Thanks');
            loadAllAnswersFromDb();
        }).error(function () {
            alert('We have problem2!');
        })
    };


    $scope.selectQ = function (id) {
        $scope.question = 0;
        $scope.question = id;
        $routeParams.id = id;
    };
})
;