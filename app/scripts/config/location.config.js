"use strict";

app.config(['$locationProvider', '$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/login/');

}]);
