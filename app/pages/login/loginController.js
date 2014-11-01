'use strict';
angular.module('swamp.controllers').controller('loginController', ['$scope', 'authApiService', function($scope, authApiService) {

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function() {

    authApiService.login($scope.credentials.username, $scope.credentials.password)
      .catch(_onLoginFail);
  };

  function _onLoginFail() {
    console.log(2, arguments);
  }

}]);
