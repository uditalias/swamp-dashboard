"use strict";

angular.module('swamp.services').factory('swampServicesFactory', [
    '$rootScope', 'env', 'SERVICE_STATE', 'CLIENT_REQUEST', 'aggregatedDataFactory', 'AGGREGATED_LIST_TYPE', 'LOG_TYPE', 'serializeService', 'EVENTS', 'swampManager', 'modalService', 'MODAL_TYPE',
    function($rootScope, env, SERVICE_STATE, CLIENT_REQUEST, aggregatedDataFactory, AGGREGATED_LIST_TYPE, LOG_TYPE, serializeService, EVENTS, swampManager, modalService, MODAL_TYPE) {


        function SwampService(params) {
            this.id = params.id;
            this.name = params.name;
            this.description = params.description;
            this.path = params.path;
            this.script = params.script;
            this.isRunning = params.isRunning;
            this.runningEnvironment = params.runningEnvironment;
            this.selectedEnvironment = params.runningEnvironment;
            this.pid = params.pid;
            this.startIndex = params.options.startIndex;
            this.options = params.options;
            this.environments = params.environments;
            this.monitorCpu = params.monitor.cpu;
            this.monitorMemory = params.monitor.memory;
            this.monitor = params.monitor;
            this.state = this.isRunning ? SERVICE_STATE.RUN : SERVICE_STATE.STOP;
            this.viewOptions = params.viewOptions;

            this.startTime = params.startTime;
            this.uptime = null;
            this._uptimeInterval = null;

            this._createMonitorDataContainers();
            this._createLogDataContainers(this.options.maxLogsToSave);

            if(this.isRunning) {
                this._startUptimeMessageSync();
            }

            _initializeLogs.call(this, params.logs);

        }

        SwampService.prototype = {

            setEnvironments: function(environments) {

                this.environments = environments;

                $rootScope.$safeApply();

            },

            updateMonitorData: function(monitorData) {
                this.monitor = monitorData;

                if(!isNaN(this.monitor.cpu)) {

                    this.cpuData.add(this.monitor.cpu);

                }

                if(!isNaN(this.monitor.memory)) {

                    this.memoryData.add(this.monitor.memory);

                }

                $rootScope.$safeApply();
            },

            stop: function() {

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_STOP_SERVICE, this);

            },

            start: function(environment) {

                environment = environment || this.selectedEnvironment;

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_START_SERVICE, this, environment);

            },

            restart: function(environment) {

                environment = environment || this.selectedEnvironment;

                $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_RESTART_SERVICE, this, environment);

            },

            executeCommand: function(commandId) {

              $rootScope.$broadcast(CLIENT_REQUEST.REQUEST_COMMAND_EXECUTION, this, commandId);

            },

            forceStop: function() {

                this._stopUptimeMessageSync();

                this.pid = null;

                this.isRunning = false;

                this.startTime = null;

                this.cpuData.clear();

                this.memoryData.clear();

                this.monitor.cpu = false;

                this.monitor.memory = false;

                this.state = SERVICE_STATE.STOP;

                $rootScope.$safeApply();
            },

            forceStart: function(data) {

                this._startUptimeMessageSync();

                this._merge(data);

                this.state = SERVICE_STATE.RUN;

                this.selectedEnvironment = this.runningEnvironment;

                $rootScope.$safeApply();
            },

            forceRestart: function() {
                this.state = SERVICE_STATE.RESTART;

                $rootScope.$safeApply();
            },

            forcePending: function() {
                this.state = SERVICE_STATE.PENDING;

                $rootScope.$safeApply();
            },

            forceStarting: function() {
                this.state = SERVICE_STATE.STARTING;

                $rootScope.$safeApply();
            },

            log: function(logType, log) {

                var serialized = serializeService.serializeLogData(logType, log);

                switch(logType) {

                    case LOG_TYPE.OUT:

                        this.outLogData.add(serialized);

                        break;

                    case LOG_TYPE.ERROR:

                        this.errorLogData.add(serialized);

                        break;
                }

            },

            clearErrorLogs: function() {

                this.errorLogData.clear();

            },

            clearOutLogs: function() {

                this.outLogData.clear();

            },

            clearLogs: function() {

                this.clearErrorLogs();

                this.clearOutLogs();

            },

            openIOStreamer: function(type) {

                window.open('/io/' + this.id + '/' + type + '/');

            },

            dispose: function() {

                this.forceStop();

            },

            _merge: function(params) {

                _.assign(this, params);

            },

            _createMonitorDataContainers: function() {

                this.cpuData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, 20);

                this.memoryData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, 20);

            },

            _createLogDataContainers: function(maxLength) {

                this.outLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, maxLength);

                this.errorLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO, maxLength);

            },

            _startUptimeMessageSync: function() {

                this._stopUptimeMessageSync();

                this.uptime = moment(this.startTime).fromNow();

                $rootScope.$safeApply();

                this._uptimeInterval = setTimeout(function() {

                    this._startUptimeMessageSync();

                }.bind(this), env.serviceUptimeTickInterval);

            },

            _stopUptimeMessageSync: function() {

                clearTimeout(this._uptimeInterval);
                this._uptimeInterval = null;
                this.uptime = null;

            },

            getContextMenu: function() {

                var commands = swampManager.getCommands();


                var contextMenu = [{
                    title: 'Out log',
                    command: function() { $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, this.outLogData.id); }.bind(this)
                }, {
                    title: 'Error log',
                    command: function() { $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, this.errorLogData.id); }.bind(this)
                }, {
                    title: 'Restart',
                    disabled: this.state != SERVICE_STATE.RUN,
                    command: function() { this.restart(); }.bind(this)
                }, {
                    title: 'Start',
                    disabled: this.state != SERVICE_STATE.STOP,
                    command: function() { this.start(); }.bind(this)
                }, {
                    title: 'Stop',
                    disabled: this.state != SERVICE_STATE.RUN,
                    command: function() { this.stop(); }.bind(this)
                }, {
                    title: 'Force Stop',
                    command: function() { this.stop(); }.bind(this)
                }, {
                    title: 'Process I/O',
                    command: [{
                        title: 'STDOUT',
                        command: function() { this.openIOStreamer('out'); }.bind(this)
                    }, {
                        title: 'STDERR',
                        command: function() { this.openIOStreamer('error'); }.bind(this)
                    }]
                }];

                if(commands.length > 0) {

                    var commandsMenu = [];

                    if(commands.length) {
                      _.forEach(commands, function(command) {
                        commandsMenu.push({
                          title: command.name,
                          command: function(command) {

                              if(swampManager.getInfo().mode == 'remote') {

                                  var modal = modalService.open(MODAL_TYPE.EXECUTE_COMMAND_PROMPT, { service: this, command: command });

                                  modal.result.then(function() {

                                      this.executeCommand(command.id);

                                  }.bind(this));

                              } else {
                                  this.executeCommand(command.id);
                              }

                          }.bind(this, command)
                        });
                      }.bind(this));
                    }

                    contextMenu.push({
                        title: 'Commands',
                        disabled: commands.length == 0,
                        command: commandsMenu
                    });
                }

                return contextMenu;
            }

        };

        function _create(data) {

            return new SwampService(data);

        };

        function _initializeLogs(logs) {

            var self = this,
                serialized;

            if(logs.err) {

                _.forEach(logs.err, function(log) {

                    serialized = serializeService.serializeLogData(LOG_TYPE.ERROR, log);

                    self.errorLogData.add(serialized);

                });

            }

            if(logs.out) {

                _.forEach(logs.out, function(log) {

                    serialized = serializeService.serializeLogData(LOG_TYPE.OUT, log);

                    self.outLogData.add(serialized);

                });

            }

        }

        return {
            create: _create
        };

    }]);
