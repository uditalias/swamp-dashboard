"use strict";

angular.module('swamp.services').service('serializeService', [function() {

    this.serializeSwampService = function (data) {
      
        return {
            id : _.guid(),
            name : data.name,
            description : data.description,
            path : data.path,
            script : data.script,
            isRunning : data.isRunning,
            runningEnvironment : data.runningEnvironment,
            pid : data.pid,
            startTime : data.startTime,
            options : data.options,
            environments : data.environments,
            monitorCpu : data.monitor.cpu,
            monitorMemory : data.monitor.memory,
            logs: data.logs,
            monitor: {
                cpu: false,
                memory: false
            }
        }

    };

    this.serializeMonitorData = function(data) {

        var dto = {
            cpu: false,
            memory: false
        };

        if(!isNaN(data.monitor.cpu)) {
            dto.cpu = data.monitor.cpu;
        }

        if(!isNaN(data.monitor.memory)) {
            dto.memory = data.monitor.memory;
        }

        return dto;

    };

    this.serializeServiceStart = function(data) {

        return {
            isRunning: data.isRunning,
            runningEnvironment: data.runningEnvironment,
            pid: data.pid,
            startTime: data.startTime
        }

    }

    this.serializeServiceStop = function(data) {

        return {
            pid: data.pid,
            startTime: data.startTime
        }

    };

    this.serializeLogData = function(type, log) {

        return {
            type: type,
            text: log.text,
            time: moment(log.time)
        }

    };

    this.serializeServiceEnvironments = function(data) {

        return data.environments;

    };

}]);