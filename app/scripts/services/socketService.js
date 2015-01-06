"use strict";

angular.module('swamp.services').service('socketService', ['SOCKET_EVENTS', 'EVENTS', 'swampServicesManager', 'serializeService', 'env', '$rootScope', 'tokenService',
    function(SOCKET_EVENTS, EVENTS, swampServicesManager, serializeService, env, $rootScope, tokenService) {

        this._socket = null;

        this.setup = function() {

            var access_token = tokenService.getAccessToken();

            this._socket = io.connect(env.socketConnectionString, {
                reconnect: false,
                query: 'x-access-token=' + access_token
            });

            this._bindSocketEvents();

        }

        this._bindSocketEvents = function() {

            this._socket.on(SOCKET_EVENTS.CONNECT, this._onSocketConnect.bind(this));

            this._socket.on(SOCKET_EVENTS.DISCONNECT, this._onSocketDisconnect.bind(this));

            this._socket.on(SOCKET_EVENTS.MESSAGE, this._onSocketMessage.bind(this));

        }

        this._emit = function(event, data) {

            data = data || {};
            event = event.name || event;

            this._socket.emit(event, data);

        }

        this._onSocketConnect = function() {

        }

        this._onSocketDisconnect = function() {

            $rootScope.$broadcast(EVENTS.SWAMP_DISCONNECTED);

        }

        this._onSocketMessage = function(message) {
            if(message && message.event) {
                switch(message.event) {

                    case SOCKET_EVENTS.SWAMP_INITIAL:

                        var serialized = [];

                        _.forEach(message.data.services || [], function(raw) {
                            serialized.push(serializeService.serializeSwampService(raw));
                        });

                        $rootScope.$broadcast(EVENTS.SWAMP_DATA_RECEIVED, message.data.swamp, message.data.commands, message.data.presets);
                        $rootScope.$broadcast(EVENTS.SWAMP_SERVICES_RECEIVED, serialized);

                        break;

                    case SOCKET_EVENTS.SWAMP_OUT:

                        var logMessage = message.data.log;

                        $rootScope.$broadcast(EVENTS.SWAMP_OUT, logMessage);

                        break;

                    case SOCKET_EVENTS.SWAMP_ERROR:

                        var logMessage = message.data.log;

                        $rootScope.$broadcast(EVENTS.SWAMP_ERROR, logMessage);

                        break;

                    case SOCKET_EVENTS.SERVICE_MONITOR:

                        var serialized = serializeService.serializeMonitorData(message.data);
                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_MONITOR_UPDATE, serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_START:

                        var serialized = serializeService.serializeServiceStart(message.data);
                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_START, serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_STOP:

                        var serialized = serializeService.serializeServiceStop(message.data);
                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_STOP, serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_RESTART:

                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_RESTART, serviceName);

                        break;

                    case SOCKET_EVENTS.SERVICE_PENDING:

                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_PENDING, serviceName);

                        break;

                  case SOCKET_EVENTS.SERVICE_STARTING:

                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_STARTING, serviceName);

                        break;

                    case SOCKET_EVENTS.SERVICE_OUT:

                        var serviceName = message.data.name;
                        var logMessage = message.data.log;

                        $rootScope.$broadcast(EVENTS.SERVICE_OUT, serviceName, logMessage);


                        break;

                    case SOCKET_EVENTS.SERVICE_ERROR:

                        var serviceName = message.data.name;
                        var logMessage = message.data.log;

                        $rootScope.$broadcast(EVENTS.SERVICE_ERROR, serviceName, logMessage);

                        break;

                    case SOCKET_EVENTS.MODIFY_SERVICE_ENVIRONMENTS:

                        var serialized = serializeService.serializeServiceEnvironments(message.data);
                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.MODIFY_SERVICE_ENVIRONMENTS, serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.COMMAND_STARTED:

                        var serialized = serializeService.serializeExecutionCommand(message.data);

                        $rootScope.$broadcast(EVENTS.COMMAND_STARTED, serialized);

                        break;

                    case SOCKET_EVENTS.COMMAND_OUT:

                        var serialized = serializeService.serializeCommandOut(message.data);

                        $rootScope.$broadcast(EVENTS.COMMAND_OUT, serialized);

                        break;

                    case SOCKET_EVENTS.COMMAND_DISPOSED:

                        var serialized = serializeService.serializeCommandDisposed(message.data);

                        $rootScope.$broadcast(EVENTS.COMMAND_DISPOSED, serialized);

                        break;

                  case SOCKET_EVENTS.PRESET_CREATED:

                        var serialized = serializeService.serializePreset(message.data);

                        $rootScope.$broadcast(EVENTS.PRESET_CREATED, serialized);

                        break;

                  case SOCKET_EVENTS.PRESET_DELETED:

                        var presetId = message.data;

                        $rootScope.$broadcast(EVENTS.PRESET_DELETED, presetId);

                        break;
                }
            }
        }

        $rootScope.$on(SOCKET_EVENTS.SERVICE_START, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SERVICE_STOP, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SERVICE_RESTART, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_STOP_ALL, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_RESTART_ALL, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_START_ALL, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.MODIFY_SERVICE_ENVIRONMENTS, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.EXECUTE_COMMAND, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.TERMINATE_COMMAND, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.RUN_PRESET, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.CREATE_PRESET, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.DELETE_PRESET, this._emit.bind(this));
    }]);
