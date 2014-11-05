'use strict';
angular.module('swamp.services').service('authApiService', ['$http', 'env', 'userService', '$state', 'swampManager', 'socketService', 'tokenService', function($http, env, userService, $state, swampManager, socketService, tokenService) {

  this.isLoggedIn = function() {

    return $http.get(env.apiBasePath + 'api/auth/login/', { headers: { 'x-access-token': tokenService.getAccessToken() } })
      .then(_loginProcess.bind(this));

  };

  this.login = function(username, password) {

    return $http.post(env.apiBasePath + 'api/auth/login/', { username: username, password: password })
      .then(_storeAccessToken)
      .then(_loginProcess.bind(this));

  };

  this.logout = function() {

    return $http.post(env.apiBasePath + 'api/auth/logout/', {}, { headers: { 'x-access-token': tokenService.getAccessToken() } })
      .finally(_logout);

  };

  function _logout() {

    tokenService.resetToken();

    location.reload();
  }

  function _loginProcess() {

    userService.setLoggedIn(true);

    $state.go('dashboard');

    swampManager.initialize();

    socketService.setup();

  }

  function _storeAccessToken(res) {

    tokenService.setAccessToken(res.data.accessToken);
  }

}]);
