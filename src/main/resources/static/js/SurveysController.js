/**
 * Created byDOminika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;

    //$resource("../rest/api"}).get(); return an object.
    //$resource("../rest/api").query(); return an array.

    var loadAllPeopleFromDb = function () {
        var Survey = $resource('survey/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Survey.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.survey = response; // widoku będziesz używał teraz people
        });
    };
    loadAllPeopleFromDb();





    //$scope.people = $resource('/person/all', []).get(); //to da undefined bo nie zdazyl jeszcze pobrac
    //alert($scope.people.size);
    //scope.cos = dajesz wtedy gdy chcesz miec dostep do czegos w pliku html w widoku i zbindowac na przyklad



    //Zapis osoby do bazy danych
    $scope.saveSurvey = function () {
        var title = $scope.title; //pobieramy imie z pola w html



        //alert(name); //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            salary: salary

        };

        $http.post('/user/add',userObject).success(function () { //wywloujemy
            //alert('Thanks');
            loadAllPeopleFromDb();
        }).error(function () {
            alert('We have problem!');
        })
    };

});