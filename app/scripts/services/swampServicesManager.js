"use strict";

angular.module('swamp.services').service('swampServicesManager', ['swampServicesFactory', '$rootScope', function(swampServicesFactory, $rootScope) {

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

        _.forEach(this.services, function(service) {

            if(service.name == name) {
                return this.getById(service.id);
            }

        }.bind(this));

        return null;
    }

    this.getById = function(id) {
        return this._services[id] || null;
    }

}]);