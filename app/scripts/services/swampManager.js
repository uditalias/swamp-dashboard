"use strict";

angular.module('swamp.services').service('swampManager', [
    '$rootScope', 'EVENTS', 'LOG_TYPE', 'serializeService', 'aggregatedDataFactory', 'AGGREGATED_LIST_TYPE', 'SOCKET_EVENTS', 'CLIENT_REQUEST',
    function($rootScope, EVENTS, LOG_TYPE, serializeService, aggregatedDataFactory, AGGREGATED_LIST_TYPE, SOCKET_EVENTS, CLIENT_REQUEST) {

        this.outLogData = null;
        this.errorLogData = null;

        this._info = {
            totalmem: 0,
            mode: '*'
        };

        this._commands = [];
        this._commandsExecution = [];
        this._presets = [];

        this.getInfo = function() {
            return this._info;
        };

        this.getCommands = function() {
            return this._commands;
        };

        this.getCommandsExecution = function() {
            return this._commandsExecution;
        };

        this.getPresets = function() {
            return this._presets;
        };

        this.runPreset = function(preset) {

            $rootScope.$broadcast(SOCKET_EVENTS.RUN_PRESET, { id: preset.id });

        };

        this.createPreset = function(presetDefinition) {

            $rootScope.$broadcast(SOCKET_EVENTS.CREATE_PRESET, { preset: presetDefinition });

        };

        this.deletePreset = function(presetId) {

            $rootScope.$broadcast(SOCKET_EVENTS.DELETE_PRESET, { presetId: presetId });

        };

        this.log = function(logType, log) {

            var serialized = serializeService.serializeLogData(logType, log);

            switch(logType) {

                case LOG_TYPE.OUT:

                    this.outLogData.add(serialized);

                    break;

                case LOG_TYPE.ERROR:

                    this.errorLogData.add(serialized);

                    break;
            }

        };

        this._createLogDataContainers = function() {

            this.outLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO);

            this.errorLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO);

        };


        this.initialize = function() {

            this._createLogDataContainers();

        };

        function _onSwampOut(event, log) {

            this.log(LOG_TYPE.OUT, log);

        };

        function _onSwampError(event, log) {

            this.log(LOG_TYPE.ERROR, log);

        };

        function _setSwampLogs(logs) {
          var self = this;

          if(logs) {

            _.forEach(logs.out || [], function(log) {

              self.log(LOG_TYPE.OUT, log);

            });

            _.forEach(logs.err || [], function(log) {

              self.log(LOG_TYPE.ERROR, log);

            });

          }
        }

        function _setSwampInfo(info) {

          if(info) {
            _.extend(this._info, info);
          }
        }

        function _setSwampCommands(commands) {

            if(commands && commands.definitions) {
                this._commands = commands.definitions;
            }

            if(commands && commands.executions) {
                _.pushAll(this._commandsExecution, commands.executions);
            }
        }

        function _setSwampPresets(presets) {
          if(presets) {
            _.pushAll(this._presets, presets);
          }
        }

        function _onSwampDataReceived(event, swampData, commands, presets) {

            _setSwampLogs.call(this, swampData.logs);

            _setSwampInfo.call(this, swampData.info);

            _setSwampCommands.call(this, commands);

            _setSwampPresets.call(this, presets);

            $rootScope.$broadcast(EVENTS.SWAMP_MANAGER_INITIALIZED);

        }

        function _getExecutionCommandById(id) {
            return _.where(this._commandsExecution, function(execution) {
                return execution.id == id;
            })[0];
        }

        function _onCommandStarted(event, data) {

            var execution = _getExecutionCommandById.call(this, data.exeId);

            if(!execution) {
                this._commandsExecution.push(data.command);
            }
        }

        function _onCommandOut(event, data) {

            var execution = _getExecutionCommandById.call(this, data.exeId);

            if(execution) {
                execution.log.push(data.log)
            }
        }

        function _onCommandDisposed(event, data) {

            var execution = _getExecutionCommandById.call(this, data.exeId);

            if(execution) {
                execution.disposed = true;
                execution.success = data.success;
            }
        }

        function _onClientRequestCommandTermination(event, exeId) {
            $rootScope.$broadcast(SOCKET_EVENTS.TERMINATE_COMMAND, { id: exeId });
        }

        function _onPresetCreated(event, preset) {

            this._presets.push(preset);

        }

        function _onPresetDeleted(event, presetId) {

            _.remove(this._presets, function(preset) { return preset.id == presetId });

        }

        $rootScope.$on(EVENTS.SWAMP_OUT, _onSwampOut.bind(this));
        $rootScope.$on(EVENTS.SWAMP_ERROR, _onSwampError.bind(this));
        $rootScope.$on(EVENTS.SWAMP_DATA_RECEIVED, _onSwampDataReceived.bind(this));
        $rootScope.$on(EVENTS.COMMAND_STARTED, _onCommandStarted.bind(this));
        $rootScope.$on(EVENTS.COMMAND_OUT, _onCommandOut.bind(this));
        $rootScope.$on(EVENTS.COMMAND_DISPOSED, _onCommandDisposed.bind(this));
        $rootScope.$on(EVENTS.PRESET_CREATED, _onPresetCreated.bind(this));
        $rootScope.$on(EVENTS.PRESET_DELETED, _onPresetDeleted.bind(this));

        $rootScope.$on(CLIENT_REQUEST.REQUEST_COMMAND_TERMINATION, _onClientRequestCommandTermination);

    }]);
