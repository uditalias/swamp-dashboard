'use strict';
angular.module('swamp.controllers').controller('disconnectMessageController', [

  '$scope', 'env', '$timeout', 'speechService',

  function ($scope, env, $timeout, speechService) {

    $scope.handler = {
      reconnectTimeout: env.swampReloadSeconds
    };

    function _countDown() {

      $scope.handler.reconnectTimeout--;

      if ($scope.handler.reconnectTimeout == 0) {

        _reconnect();

      } else {

        $timeout(_countDown, 1000);

      }
    }

    function _reconnect() {
      window.location.reload();
    }

    $scope.reconnect = function () {

      speechService.stop();

      _reconnect();

    };

    speechService.speak('Houston, we have a problem', true);
    speechService.speak('It\'s seems like the Swamp just stopped or restarted...', true);

    _countDown();

  }]);
