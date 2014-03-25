"use strict";

angular.module('swamp.services').service('swampServicesManager', ['swampServicesFactory', '$rootScope', 'EVENTS',
    function(swampServicesFactory, $rootScope, EVENTS) {

        this._services = {};

        this.addService = function(service) {
            this._services[service.id] = service;
        }

        this.addServiceByRaw = function(rawData) {

            this.addService(swampServicesFactory.create(rawData));

            $rootScope.$safeApply();

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

        function _onSwampServicesReceived(event, services) {
            _.forEach(services, function(service) {
                this.addServiceByRaw(service);
            }.bind(this));
        }

        function _onServiceMonitorUpdate(event, serviceName, monitorData) {
            var service = this.getByName(serviceName);

            if(service) {
                service.updateMonitorData(monitorData);
            }
        }

        $rootScope.$on(EVENTS.SWAMP_SERVICES_RECEIVED, _onSwampServicesReceived.bind(this));
        $rootScope.$on(EVENTS.SERVICE_MONITOR_UPDATE, _onServiceMonitorUpdate.bind(this));

    }]);