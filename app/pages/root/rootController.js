'use strict';

angular.module('swamp.controllers').controller('rootController', [
    '$scope', '$rootScope', 'swampServicesManager', 'swampManager', 'SERVICE_STATE', 'EVENTS',
    function($scope, $rootScope, swampServicesManager, swampManager, SERVICE_STATE, EVENTS) {

        $scope.SERVICE_STATE = SERVICE_STATE;

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

            },
            showServiceOutLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.outLogData.id);

            },
            showServiceErrorLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.errorLogData.id);

            }
        }

        $scope.bytesToSize = _.bytesToSize;

    }]);