'use strict';

app.run([
  'authApiService',
  '$state',
  function(authApiService, $state) {

    authApiService.isLoggedIn()
      .catch(userLoggedOut);

    function userLoggedOut() {
      $state.go('login');
    }

  }]);
