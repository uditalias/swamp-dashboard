"use strict";

angular.module('swamp.services').service('swampManager', [
    '$rootScope', 'EVENTS', 'LOG_TYPE', 'serializeService', 'aggregatedDataFactory', 'AGGREGATED_LIST_TYPE',
    function($rootScope, EVENTS, LOG_TYPE, serializeService, aggregatedDataFactory, AGGREGATED_LIST_TYPE) {

        this.outLogData = null;
        this.errorLogData = null;

        this.log = function(logType, log) {

            var serialized = serializeService.serializeLogData(logType, log);

            switch(logType) {

                case LOG_TYPE.OUT:

                    this.outLogData.add(serialized);

                    break;

                case LOG_TYPE.ERROR:

                    this.errorLogData.add(serialized);

                    break;
            }

        }

        this._createLogDataContainers = function() {

            this.outLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO);

            this.errorLogData = aggregatedDataFactory.create(AGGREGATED_LIST_TYPE.FIFO);

        }


        this.initialize = function() {

            this._createLogDataContainers();

        }

        function _onSwampOut(event, log) {

            this.log(LOG_TYPE.OUT, log);

        }

        function _onSwampError(event, log) {

            this.log(LOG_TYPE.ERROR, log);

        }

        function _onSwampDataReceived(event, swampData) {

            var self = this;

            if(swampData.logs) {

                _.forEach(swampData.logs.out || [], function(log) {

                    self.log(LOG_TYPE.OUT, log);

                });

                _.forEach(swampData.logs.err || [], function(log) {

                    self.log(LOG_TYPE.ERROR, log);

                });

            }

            $rootScope.$broadcast(EVENTS.SWAMP_MANAGER_INITIALIZED);

        }

        $rootScope.$on(EVENTS.SWAMP_OUT, _onSwampOut.bind(this));
        $rootScope.$on(EVENTS.SWAMP_ERROR, _onSwampError.bind(this));
        $rootScope.$on(EVENTS.SWAMP_DATA_RECEIVED, _onSwampDataReceived.bind(this));

    }]);