"use strict";

angular.module('swamp.services').factory('swampServicesFactory', [function() {

    function SwampService(params) {
        this.id = _.guid();
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
    }

    SwampService.prototype = {

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