'use strict';

angular.module('swamp.controllers').controller('asideController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager) {

        $scope.handler = {
            tailCheckState: false,
            servicesCount: swampServicesManager.count
        }

        $scope.restartAll = function() {
            swampServicesManager.restartAllRunningServices();
        }

        $scope.stopAll = function() {
            swampServicesManager.stopAllRunningServices();
        }

        $scope.startAll = function() {
            swampServicesManager.startAllServices();
        }

        $scope.showLog = function(type) {

            var logId;

            if(type == 'out') {
                logId = swampManager.outLogData.id;
            } else {
                logId = swampManager.errorLogData.id;
            }

            $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, logId);
        }

        $scope.onCheckStateChange = function(state) {

            $rootScope.$broadcast(EVENTS.TAIL_LOGS_STATE_CHANGE, state);

        }

        function _onSwampServicesManagerInitialized(event) {
            $scope.handler.servicesCount = swampServicesManager.count();
        }

        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _onSwampServicesManagerInitialized);

    }]);