'use strict';

angular.module('swamp.services').service('settingsService', [

  '$cookieStore',

  function ($cookieStore) {

    this.get = function(key) {
      return $cookieStore.get(key);
    };

    this.set = function(key, value) {
      $cookieStore.put(key, value);
    };

  }]);
