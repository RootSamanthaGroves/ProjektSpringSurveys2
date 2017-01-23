/**
 * Created by Dominika on 2017-01-08.
 */

angular.module('myApp').controller('CreateSurveyController', function ($scope, $resource, $http) {
        $scope.message = 'Create Survey';
        $scope.showMe = false;
        $scope.showMeAnswer = false;


        $scope.getNumber = function (num) {
            return new Array(num);
        }


        $scope.setNumber = function () {
            $scope.showMe = true;
        };


        $scope.getNumberAnswer = function (i) {
            return new Array(i);
        };


        $scope.setNumberAnswer = function () { alert(i);
            $scope.showMeAnswer = true;
            var i = $scope.answerOfQuestion; //pobieramy imie z pola w html
            alert(i);
        };


    $scope.saveSurvey = function () {
        var Title = $scope.titleOfSurvey;
        alert(Title);


        var surveyObject = {
            title: Title
        };


        $http.post('/survey/add', surveyObjectt).success(function () { //wywloujemy
            alert('Thanks');
            // $scope.$emit("myEvent");

        }).error(function () {
            alert('We have problem!');
        })
    };

    $scope.saveQuestion = function () {
        var ilQuestion= $scope. quantityQuestion;





        var questionList = [];

        var result = {};
        var elements = document.forms.foo.getElementsByTagName("input");
        for(var i = 0; i < elements.length; i++)
        {
            questionList[i]="test "+i;
        }



            // var userObject = {
            //     question: questionOfSurvey
            // };
            //
            //





        alert(userObject.firstName+userObject.email);
        $http.post('/question/add',userObject).success(function () { //wywloujemy
            alert('Thanks');

        }).error(function () {
            alert('We have problem!');
        })
    };



    }
);