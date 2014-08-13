angular.module('main')
    .controller('UserController', ['$scope', '$rootScope', function ($scope, $rootScope) {
       
        $scope.addUser = function () {
            var usr = {};

            usr.id = 1;
            usr.name = $scope.name;
            usr.handphone = $scope.handphone;
            usr.email = $scope.email;
            console.log(usr);
            $scope.usersuccess = true;
            $rootScope.isUserLoggedIn = 1;
            $scope.name = ""
            $scope.email = ""
            $scope.handphone = ""
            $scope.captcha = ""
            console.log('user logged in: ' + $rootScope.isUserLoggedIn);
        }
    }]);