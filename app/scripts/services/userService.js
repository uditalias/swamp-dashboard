'use strict';
angular.module('swamp.services').service('userService', [function() {

  this._isLoggedIn = false;

  this.isLoggedIn = function() {
    return this._isLoggedIn;
  };

  this.setLoggedIn = function(state) {
    this._isLoggedIn = state;
  };


}]);
