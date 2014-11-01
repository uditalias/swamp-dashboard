'use strict';

app.run([
  'authApiService',
  'userService',
  '$state',
  '$rootScope',
  'EVENTS',
  function(authApiService, userService, $state, $rootScope, EVENTS) {

    authApiService.isLoggedIn()
      .catch(userLoggedOut);

    function userLoggedOut() {
      $state.go('login');
    }

    function _onStateChangeStart(evt, toState, toParams, fromState, fromParams) {
        if(toState.name == 'login' && userService.isLoggedIn()) {
            return $state.go('dashboard');
        }

        if(toState.name == 'dashboard' && !userService.isLoggedIn()) {
          return $state.go('login');
        }

    }

    function _onStateChangeError(event, toState, toParams, fromState, fromParams, error) {

    }

    function _onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {

    }

    function _onViewContentLoaded() {
    }


    $rootScope.$on(EVENTS.STATE_CHANGE_START, _onStateChangeStart);
    $rootScope.$on(EVENTS.STATE_CHANGE_ERROR, _onStateChangeError);
    $rootScope.$on(EVENTS.STATE_CHANGE_SUCCESS, _onStateChangeSuccess);
    $rootScope.$on(EVENTS.VIEW_CONTENT_LOADED, _onViewContentLoaded);

  }]);
