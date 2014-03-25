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

            this._socket.on('connect', this._onSocketConnect.bind(this));

            this._socket.on('disconnect', this._onSocketDisconnect.bind(this));

            this._socket.on('message', this._onSocketMessage.bind(this));

        }

        this._onSocketConnect = function() {

        }

        this._onSocketDisconnect = function() {

        }

        this._onSocketMessage = function(message) {
            if(message && message.event) {
                switch(message.event) {

                    case SOCKET_EVENTS.SWAMP_INITIAL:

                        var serialized = [];

                        _.forEach(message.data || [], function(raw) {
                            serialized.push(serializeService.serializeSwampService(raw));
                        });

                        $rootScope.$broadcast(EVENTS.SWAMP_SERVICES_RECEIVED, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_MONITOR:

                        var serialized = serializeService.serializeMonitorData(message.data);
                        var serviceName = message.data.name;

                        $rootScope.$broadcast(EVENTS.SERVICE_MONITOR_UPDATE, serviceName, serialized);

                        break;
                }
            }
        }

    }]);