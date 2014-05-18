"use strict";

angular.module('swamp.services').service('swampServicesManager', [
    'swampServicesFactory', '$rootScope', 'EVENTS', 'CLIENT_REQUEST', 'SOCKET_EVENTS', 'LOG_TYPE', 'SERVICE_STATE',
    function(swampServicesFactory, $rootScope, EVENTS, CLIENT_REQUEST, SOCKET_EVENTS, LOG_TYPE, SERVICE_STATE) {

        this._services = {};

        this.addService = function(service) {
            this._services[service.id] = service;
        }

        this.addServiceByRaw = function(rawData) {

            this.addService(swampServicesFactory.create(rawData));

            $rootScope.$safeApply();

        }

        this.count = function() {
            if(this._services) {
                return Object.keys(this._services).length;
            }

            return 0;
        }

        this.getAll = function() {
            return this._services;
        }

        this.getByName = function(name) {

            for(var serviceId in this._services) {

                if(this._services[serviceId].name == name) {
                    return this.getById(serviceId);
                }
            }

            return null;
        }

        this.getById = function(id) {
            return this._services[id] || null;
        }

        this.removeById = function(id) {
            delete this._services[id];

            $rootScope.$safeApply();
        }

        this.stopAllRunningServices = function() {

            $rootScope.$broadcast(SOCKET_EVENTS.SWAMP_STOP_ALL);

        }

        this.restartAllRunningServices = function() {

            $rootScope.$broadcast(SOCKET_EVENTS.SWAMP_RESTART_ALL);

        }

        this.startAllServices = function() {

            $rootScope.$broadcast(SOCKET_EVENTS.SWAMP_START_ALL);

        }

        function _dispose() {

            _.forEach(this._services, function(service) {

                service.dispose();

                this.removeById(service.id);

            }.bind(this));

        }

        function _onSwampServicesReceived(event, services) {
            _.forEach(services, function(service) {

                this.addServiceByRaw(service);

            }.bind(this));

            $rootScope.$broadcast(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED);
        }

        function _onServiceMonitorUpdate(event, serviceName, monitorData) {
            var service = this.getByName(serviceName);

            if(service) {
                service.updateMonitorData(monitorData);
            }
        }

        function _onServiceStart(event, serviceName, data) {
            var service = this.getByName(serviceName);

            if(service) {
                service.forceStart(data);
            }
        }

        function _onServiceStop(event, serviceName, data) {
            var service = this.getByName(serviceName);

            if(service) {
                service.forceStop(data);
            }

        }

        function _onServiceRestart(event, serviceName) {
            var service = this.getByName(serviceName);

            if(service) {
                service.forceRestart();
            }
        }

        function _onServiceOut(event, serviceName, log) {

            var service = this.getByName(serviceName);

            if(service) {
                service.log(LOG_TYPE.OUT, log);
            }

        }

        function _onServiceError(event, serviceName, log) {

            var service = this.getByName(serviceName);

            if(service) {
                service.log(LOG_TYPE.ERROR, log);
            }

        }

        function _onClientRequestStartService(event, service, environment) {

            var params = {
                name: service.name,
                environment: environment
            }

            $rootScope.$broadcast(SOCKET_EVENTS.SERVICE_START, params);

        }

        function _onClientRequestStopService(event, service) {

            var params = {
                name: service.name
            }

            $rootScope.$broadcast(SOCKET_EVENTS.SERVICE_STOP, params);

        }

        function _onClientRequestRestartService(event, service, environment) {

            var params = {
                name: service.name,
                environment: environment
            }

            $rootScope.$broadcast(SOCKET_EVENTS.SERVICE_RESTART, params);

        }

        function _onSwampDisconnected() {

            _dispose.call(this);

        }

        $rootScope.$on(EVENTS.SWAMP_SERVICES_RECEIVED, _onSwampServicesReceived.bind(this));
        $rootScope.$on(EVENTS.SWAMP_DISCONNECTED, _onSwampDisconnected.bind(this));
        $rootScope.$on(EVENTS.SERVICE_MONITOR_UPDATE, _onServiceMonitorUpdate.bind(this));
        $rootScope.$on(EVENTS.SERVICE_START, _onServiceStart.bind(this));
        $rootScope.$on(EVENTS.SERVICE_STOP, _onServiceStop.bind(this));
        $rootScope.$on(EVENTS.SERVICE_RESTART, _onServiceRestart.bind(this));
        $rootScope.$on(EVENTS.SERVICE_OUT, _onServiceOut.bind(this));
        $rootScope.$on(EVENTS.SERVICE_ERROR, _onServiceError.bind(this));

        $rootScope.$on(CLIENT_REQUEST.REQUEST_START_SERVICE, _onClientRequestStartService.bind(this));
        $rootScope.$on(CLIENT_REQUEST.REQUEST_STOP_SERVICE, _onClientRequestStopService.bind(this));
        $rootScope.$on(CLIENT_REQUEST.REQUEST_RESTART_SERVICE, _onClientRequestRestartService.bind(this));

    }]);