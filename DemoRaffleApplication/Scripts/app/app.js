// Main configuration file. Sets up AngularJS module and routes and any other config objects

var appRoot = angular.module('main', ['ngRoute', 'ngResource']);     //Define the main module


appRoot.factory('EventService', function () {
    return {
        events: [],
        eventid: 0,
        userevents: [],
        userregister: 0
    };
});

appRoot
    .config(['$routeProvider', function ($routeProvider) {
        //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (Razor .cshtml view)
        $routeProvider
            .when('/home', { templateUrl: '/home/main', controller: 'MainController' })
            .when('/contact', { templateUrl: '/home/contact', controller: 'ContactController' })
            .when('/about', { templateUrl: '/home/about', controller: 'AboutController' })
            .when('/demo', { templateUrl: '/home/demo', controller: 'DemoController' })
            .when('/angular', { templateUrl: '/home/angular' })
            .when('/event2', { templateUrl: '/home/event2' })
            .when('/demouser', { templateUrl: '/home/demouser', controller: 'EventController' })
            .when('/democreateuser', { templateUrl: '/home/democreateuser', controller: 'UserController' })
            .when('/demoadmin', { templateUrl: '/home/demoadmin', controller: 'EventController' })
            .when('/adminscheme', { templateUrl: '/home/adminscheme', controller: 'SchemeController' })
            .otherwise({ redirectTo: '/home' });
    }])
    .controller('RootController', ['$scope', '$route', '$routeParams', '$location', '$rootScope', function ($scope, $route, $routeParams, $location, $rootScope) {
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            
            $scope.isUserLoggedIn = $rootScope.isUserLoggedIn;
            $scope.activeViewPath = $location.path();
        });
        $rootScope.isUserLoggedIn = 0;
        $scope.isUserLoggedIn = $rootScope.isUserLoggedIn;
        console.log('isUserLoggedIn :' + $rootScope.isUserLoggedIn);
    }]);

