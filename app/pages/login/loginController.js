'use strict';
angular.module('swamp.controllers').controller('loginController', ['$scope', 'authApiService', function($scope, authApiService) {

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.err = null;

  $scope.login = function() {

    $scope.err = null;

    authApiService.login($scope.credentials.username, $scope.credentials.password)
      .catch(_onLoginFail);
  };

  function _onLoginFail(response) {
    $scope.err = response.statusText;
  }

}]);
