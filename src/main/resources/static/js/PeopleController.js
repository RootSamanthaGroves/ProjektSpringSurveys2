/**
 * Created by Marcin on 24.11.2016.
 */
angular.module('myApp').controller('PeopleController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from PeopleController';
    $scope.user;

    //$resource("../rest/api"}).get(); return an object.
    //$resource("../rest/api").query(); return an array.

    var loadAllPeopleFromDb = function () {
        var User = $resource('user/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        User.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.user = response; // widoku będziesz używał teraz people
        });
    };
    loadAllPeopleFromDb();





    //$scope.people = $resource('/person/all', []).get(); //to da undefined bo nie zdazyl jeszcze pobrac
    //alert($scope.people.size);
    //scope.cos = dajesz wtedy gdy chcesz miec dostep do czegos w pliku html w widoku i zbindowac na przyklad



    //Zapis osoby do bazy danych
    $scope.savePerson = function () {
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var lastName = $scope.lastNameOfUser;
        var email = $scope.emailOfUser;
        var password = $scope.passwordOfUser;
        var salary = $scope.salaryOfUser;

        //alert(name); //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
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