'use strict';

angular.module('swamp.controllers').controller('asideController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager', 'modalService', 'MODAL_TYPE',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager, modalService, MODAL_TYPE) {

        $scope.handler = {
            tailCheckState: false,
            servicesCount: swampServicesManager.count,
            executionCommands: swampManager.getCommandsExecution()
        }

        $scope.restartAll = function() {

            if(swampManager.getInfo().mode == 'remote') {

                var modal = modalService.open(MODAL_TYPE.PROMPT, { name: 'running services', action: 'restart all' });

                modal.result.then(function() {
                    swampServicesManager.restartAllRunningServices();
                });

            } else {
                swampServicesManager.restartAllRunningServices();
            }
        }

        $scope.stopAll = function() {

            if(swampManager.getInfo().mode == 'remote') {

                var modal = modalService.open(MODAL_TYPE.PROMPT, { name: 'running services', action: 'stop all' });

                modal.result.then(function() {
                    swampServicesManager.stopAllRunningServices();
                });

            } else {
                swampServicesManager.stopAllRunningServices();
            }

        }

        $scope.startAll = function() {

            if(swampManager.getInfo().mode == 'remote') {

                var modal = modalService.open(MODAL_TYPE.PROMPT, { name: 'services', action: 'start all' });

                modal.result.then(function() {
                    swampServicesManager.startAllServices();
                });

            } else {
                swampServicesManager.startAllServices();
            }

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

        $scope.clearAllLogs = function() {

            $rootScope.$broadcast(EVENTS.CLEAR_ALL_LOGS);

        }

        $scope.openCommandExecutionWindow = function(execution) {
            modalService.open(MODAL_TYPE.COMMAND_EXECUTION, execution);
        }

        function _onSwampServicesManagerInitialized(event) {
            $scope.handler.servicesCount = swampServicesManager.count();
        }

        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _onSwampServicesManagerInitialized);

    }]);
