'use strict';

angular.module('swamp.controllers').controller('asideController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager) {

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

    }]);