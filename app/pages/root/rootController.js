'use strict';

angular.module('swamp.controllers').controller('rootController', ['$scope', 'swampServicesManager', function($scope, swampServicesManager) {

    $scope.services = swampServicesManager.getAll();

    $scope.serviceActions = {
        start: function(service, env) {
            service.start(env);
        },
        stop: function(service) {
            service.stop();
        },
        restart: function(service, env) {
            service.restart(env);
        }
    }

    $scope.bytesToSize = _.bytesToSize;

}]);