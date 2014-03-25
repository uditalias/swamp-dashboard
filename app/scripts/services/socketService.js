"use strict";

angular.module('swamp.services').service('socketService', ['EVENTS', 'swampServicesManager', 'env', function(EVENTS, swampServicesManager, env) {

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

                case EVENTS.SOCKET_SWAMP_INITIAL:

                    _.forEach(message.data || [], function(service) {
                        swampServicesManager.addServiceByRaw(service);
                    });

                    break;

            }
        }
    }

}]);