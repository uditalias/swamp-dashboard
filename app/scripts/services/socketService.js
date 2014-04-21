"use strict";

angular.module('swamp.services').service('socketService', ['SOCKET_EVENTS', 'EVENTS', 'swampServicesManager', 'serializeService', 'env', '$rootScope',
    function(SOCKET_EVENTS, EVENTS, swampServicesManager, serializeService, env, $rootScope) {

        this._socket = null;

        this.setup = function() {

            this._socket = io.connect(env.socketConnectionString, {
                reconnect: false
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

                        $rootScope.$broadcast(EVENTS.SWAMP_DATA_RECEIVED, message.data.swamp);
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
                }
            }
        }

        $rootScope.$on(SOCKET_EVENTS.SERVICE_START, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SERVICE_STOP, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SERVICE_RESTART, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_STOP_ALL, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_RESTART_ALL, this._emit.bind(this));
        $rootScope.$on(SOCKET_EVENTS.SWAMP_START_ALL, this._emit.bind(this));

    }]);