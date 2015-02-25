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

        speechService.speek($scope.handler.reconnectTimeout, true);

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

    speechService.speek('Houston, we have a problem', true);
    speechService.speek('Reconnecting in', true);

    _countDown();

  }]);
