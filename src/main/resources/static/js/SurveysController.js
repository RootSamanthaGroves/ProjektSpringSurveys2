/**
 * Created byDominika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http, $rootScope, SurveyService) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;
    $scope.idSurvey;
    $scope.ankietka;



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


})
// .service('myService', function(){
//
//     this.ankietka= {ankietka2:[]};
// })

;