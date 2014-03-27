"use strict";

angular.module('swamp.services').factory('swampServicesFactory', ['$rootScope', 'SERVICE_STATE', 'CLIENT_REQUEST', 'aggregatedDataFactory', 'AGGREGATED_LIST_TYPE',
    function($rootScope, SERVICE_STATE, CLIENT_REQUEST, aggregatedDataFactory, AGGREGATED_LIST_TYPE) {

        function SwampService(params) {
            this.id = params.id;
            this.name = params.name;
            this.description = params.description;
            this.path = params.path;
            this.script = params.script;
            this.isRunning = params.isRunning;
            this.runningEnvironment = params.runningEnvironment;
            this.pid = params.pid;
            this.options = params.options;
            this.environments = params.environments;
            this.monitorCpu = params.monitor.cpu;
            this.monitorMemory = params.monitor.memory;
            this.monitor = params.monitor;
            this.state = this.isRunning ? SERVICE_STATE.RUN : SERVICE_STATE.STOP;

            this.startTime = params.startTime;
            this.uptime = null;
            this._uptimeInterval = null;

            this.cpuData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, 100);
            this.memoryData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, 100);

            if(this.isRunning) {
                this._startUptimeMessageSync();
            }
        }

        SwampService.prototype = {

            updateMonitorData: function(monitorData) {
                this.monitor = monitorData;

                this.cpuData.add(this.monitor.cpu);
                this.memoryData.add(this.monitor.memory);

                $rootScope.$safeApply();
            },

            stop: function() {

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_STOP_SERVICE, this);

            },

            start: function(environment) {

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_START_SERVICE, this, environment);

            },

            restart: function(environment) {

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_RESTART_SERVICE, this, environment);

            },

            forceStop: function(data) {

                this._stopUptimeMessageSync();

                this.pid = null;

                this.isRunning = false;

                this.startTime = null;

                this.cpuData.clear();

                this.memoryData.clear();

                this.monitor.cpu = 0;

                this.monitor.memory = 0;

                this.state = SERVICE_STATE.STOP;

                $rootScope.$safeApply();
            },

            forceStart: function(data) {

                this._startUptimeMessageSync();

                this._merge(data);

                this.state = SERVICE_STATE.RUN;

                $rootScope.$safeApply();
            },

            forceRestart: function() {
                this.state = SERVICE_STATE.RESTART;

                $rootScope.$safeApply();
            },

            _merge: function(params) {

                _.assign(this, params);

            },

            _startUptimeMessageSync: function() {

                this.uptime = moment(new Date()).from(this.startTime);

                this._uptimeInterval = setTimeout(function() {

                    this._startUptimeMessageSync();

                }.bind(this), 5000);

            },

            _stopUptimeMessageSync: function() {

                clearTimeout(this._uptimeInterval);
                this._uptimeInterval = null;
                this.uptime = null;

            }

        };

        function _create(data) {

            return new SwampService(data);

        };

        return {
            create: _create
        };

    }]);