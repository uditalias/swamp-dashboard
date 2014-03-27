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
                cpu: 0,
                memory: 0
            }
        }

    };

    this.serializeMonitorData = function(data) {

        return {
            cpu: data.monitor.cpu,
            memory: data.monitor.memory
        }

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

    this.serializeLogData = function(type, log, time) {

        return {
            type: type,
            text: log,
            time: time || new Date()
        }

    }

}]);