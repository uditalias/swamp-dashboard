'use strict';
angular.module('swamp.services').service('authApiService', ['$http', 'env', 'userService', '$state', 'swampManager', 'socketService', function($http, env, userService, $state, swampManager, socketService) {

  this.isLoggedIn = function() {

    return $http.get(env.apiBasePath + 'api/auth/login/')
      .then(_loginProcess);

  };

  this.login = function(username, password) {

    return $http.post(env.apiBasePath + 'api/auth/login/', { username: username, password: password })
      .then(_loginProcess);

  };

  this.logout = function() {

    return $http.get(env.apiBasePath + 'api/auth/logout/')
      .finally(_logout);

  };

  function _logout() {
    location.reload();
  }

  function _loginProcess() {

    userService.setLoggedIn();

    $state.go('dashboard');

    swampManager.initialize();

    socketService.setup();

  }

}]);
