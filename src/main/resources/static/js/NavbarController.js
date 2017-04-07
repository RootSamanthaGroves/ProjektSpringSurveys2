/**
 * Created by Dominika on 2017-01-23.
 */
angular.module('myApp').controller('NavbarController', function ($scope, $resource, $localStorage) {

    $scope.email;
    $scope.Id;
    $scope.role;

    var loadCurrentUser = function () {
        //debugger;
        var User = $resource('user/current', {}, {
            query: {method: 'get', isArray: false, cancellable: true}
        });
        User.query(function (response) {
            $localStorage.loginUser = response.data;
            $scope.email = response.email;
            $localStorage.currentUserId = response.id;
            $scope.Id = response.id;
            $localStorage.email = response.email;
            $localStorage.name = response.name;
            $localStorage.surname = response.surname;
            $localStorage.role = response.role;
            $localStorage.isLogin = true;

            if (angular.equals(response.role, 'ROLE_ADMIN')) {
                $scope.admin = true;
                $localStorage.isAdmin = true;
            } else {
                $scope.admin = false;
                $localStorage.isAdmin = false;
            }
            // if (angular.equals(response.id, 0)) {
            //     $localStorage.isLogin = true;
            // } else {
            //     $localStorage.isLogin = false;
            // }
        });
    };
    loadCurrentUser();

    $scope.removeUserFromLocalStorage = function () {
        // delete $localStorage.loginUser;
        // delete $localStorage.currentUserId;
        // delete $localStorage.email;
        // delete $localStorage.name;
        // delete $localStorage.surname;
        // delete $localStorage.isAdmin;
        // delete $localStorage.isLogin;
        $localStorage.$reset();
    }
});