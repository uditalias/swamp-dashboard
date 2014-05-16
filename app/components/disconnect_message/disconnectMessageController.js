'use strict';
angular.module('swamp.controllers').controller('disconnectMessageController', ['$scope', 'env', '$timeout', function($scope, env, $timeout) {

    $scope.handler = {
        reconnectTimeout: env.swampReloadSeconds
    }

    function _countDown() {

        $scope.handler.reconnectTimeout--;

        if($scope.handler.reconnectTimeout == 0) {

            _reconnect();

        } else {

            $timeout(_countDown, 1000);

        }
    }

    function _reconnect() {
        window.location.reload();
    }

    $scope.reconnect = function() {

        _reconnect();

    }

    _countDown();

}]);