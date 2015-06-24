'use strict';

angular.module('swamp.controllers').controller('asideController', [
  '$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager', 'modalService', 'MODAL_TYPE', 'SETTING', 'settingsService', 'speechService',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager, modalService, MODAL_TYPE, SETTING, settingsService, speechService) {

        $scope.handler = {
            tailCheckState: false,
            servicesCount: 0,
            executionCommands: swampManager.getCommandsExecution(),
            presets: swampManager.getPresets(),
            speechEnabled: !!settingsService.get(SETTING.SPEECH_ENABLED)
        };

        $scope.toggleSpeech = function() {

            if($scope.handler.speechEnabled) {
                speechService.stop();
                settingsService.set(SETTING.SPEECH_ENABLED, null);
                $scope.handler.speechEnabled = false;
            } else {
                settingsService.set(SETTING.SPEECH_ENABLED, 1);
                $scope.handler.speechEnabled = true;
            }

        };

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

        $scope.startPreset = function(preset) {
            var modal = modalService.open(MODAL_TYPE.RUN_PRESET, preset);

            modal.result.then(function(_preset) {

                swampManager.runPreset(_preset);

            });
        }

        $scope.createPreset = function() {

            var modal = modalService.open(MODAL_TYPE.CREATE_PRESET);

            modal.result.then(function(preset) {

              swampManager.createPreset(preset);

            });

        }

        function _onSwampServicesManagerInitialized(event) {
            $scope.handler.servicesCount = swampServicesManager.count();
        }

        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _onSwampServicesManagerInitialized);

    }]);
