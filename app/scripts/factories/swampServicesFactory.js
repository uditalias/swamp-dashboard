"use strict";

angular.module('swamp.services').factory('swampServicesFactory', ['$rootScope', function($rootScope) {

    function SwampService(params) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.path = params.path;
        this.script = params.script;
        this.isRunning = params.isRunning;
        this.runningEnvironment = params.runningEnvironment;
        this.pid = params.pid;
        this.startTime = params.startTime;
        this.options = params.options;
        this.environments = params.environments;
        this.monitorCpu = params.monitor.cpu;
        this.monitorMemory = params.monitor.memory;
        this.monitor = params.monitor;
    }

    SwampService.prototype = {

        updateMonitorData: function(monitorData) {
            this.monitor = monitorData

            $rootScope.$safeApply();
        },

        stop: function() {

        },

        start: function() {

        },

        restart: function() {

        }

    };

    function _create(data) {

        return new SwampService(data);

    };

    return {
        create: _create
    };

}]);