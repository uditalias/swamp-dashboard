'use strict';
angular.module('swamp.services').service('tokenService', ['$cookieStore', function($cookieStore) {

  var accessToken = '';

  this.setAccessToken = function(token) {
    accessToken = token;
    $cookieStore.put('_at', token);
  };

  this.getAccessToken = function() {
    return accessToken || $cookieStore.get('_at');
  };

  this.resetToken = function() {
    accessToken = '';
    $cookieStore.remove('_at');
  };

}]);
