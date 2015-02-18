'use strict';

angular.module('swamp.controllers').controller('dashboardController', [
    '$scope', '$rootScope', 'swampServicesManager', 'swampManager', 'SERVICE_STATE', 'EVENTS', 'modalService', 'MODAL_TYPE',
    function($scope, $rootScope, swampServicesManager, swampManager, SERVICE_STATE, EVENTS, modalService, MODAL_TYPE) {

        $scope.handler = {
            servicesFilter: '',
            orderBy: 'startIndex',
            orderByDir: '',
            filteredServices: [],
            isLoading: true,
            pageScrolled: false,
            viewType: 'list'
        };

        $scope.SERVICE_STATE = SERVICE_STATE;

        $scope.totalSwampMemory = 0;

        $scope.services = [];

        $scope.totalRunning = 0;

        $scope.totalStopped = 0;

        $scope.totalRestarting = 0;

        $scope.totalPending = 0;

        $scope.totalStarting = 0;

        $scope.serviceActions = {
            start: function(service, env) {

                if(swampManager.getInfo().mode == 'remote') {
                    var modal = modalService.open(MODAL_TYPE.PROMPT, { name: service.name, action: 'start' });

                    modal.result.then(function() {
                        service.start(env);
                    });

                } else {
                    service.start(env);
                }

            },
            stop: function(service) {

                if(swampManager.getInfo().mode == 'remote') {
                    var modal = modalService.open(MODAL_TYPE.PROMPT, { name: service.name, action: 'stop' });

                    modal.result.then(function() {
                        service.stop();
                    });


                } else {
                    service.stop();
                }

            },
            restart: function(service, env) {

                if(swampManager.getInfo().mode == 'remote') {
                    var modal = modalService.open(MODAL_TYPE.PROMPT, { name: service.name, action: 'restart' });

                    modal.result.then(function() {
                        service.restart(env);
                    });

                } else {
                    service.restart(env);
                }

            },
            showServiceOutLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.outLogData.id);

            },
            showServiceErrorLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.errorLogData.id);

            },
            openEnvironmentsEditor: function(service) {

                modalService.open(MODAL_TYPE.SERVICE_ENVIRONMENTS_EDITOR, service);

            }
        };

        $scope.onPageScrolled = function(state) {

            $scope.handler.pageScrolled = state;

        };

        $scope.bytesToSize = _.bytesToSize;

        $scope.orderBy = function(column) {
            if($scope.handler.orderBy == column) {
                $scope.handler.orderByDir = $scope.handler.orderByDir == '-' ? '' : '-';
            } else {
                $scope.handler.orderByDir = '';
            }

            $scope.handler.orderBy = column;
        }

        $scope.formatMemoryValue = function(value) {
            return value ? _.bytesToSize(value) : '';
        }

        $scope.formatCpuValue = function(value) {
            return !isNaN(value) ? value + '%' : '';
        }

        function _onServicesFilterChange(event, filter) {

            $scope.handler.servicesFilter = filter;

        }

        function _onSwampServicesManagerInitialized() {

            $scope.totalSwampMemory = swampManager.getInfo().totalmem;

            $scope.services = _.toArray(swampServicesManager.getAll());

            $scope.handler.isLoading = false;

            _refreshServicesCountSummary();
        }

        function _refreshServicesCountSummary() {
            $scope.totalRunning = swampServicesManager.countRunning();

            $scope.totalStopped = swampServicesManager.countStopped();

            $scope.totalRestarting = swampServicesManager.countRestarting();

            $scope.totalPending = swampServicesManager.countPending();

            $scope.totalStarting = swampServicesManager.countStarting();

            $rootScope.$safeApply();
        }

        if(_.toArray(swampServicesManager.getAll()).length) {
          _onSwampServicesManagerInitialized();
        }

        $rootScope.$on(EVENTS.SERVICES_FILTER_CHANGE, _onServicesFilterChange);
        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _onSwampServicesManagerInitialized);
        $rootScope.$on(EVENTS.SERVICE_START, _refreshServicesCountSummary);
        $rootScope.$on(EVENTS.SERVICE_STOP, _refreshServicesCountSummary);
        $rootScope.$on(EVENTS.SERVICE_RESTART, _refreshServicesCountSummary);
        $rootScope.$on(EVENTS.SERVICE_PENDING, _refreshServicesCountSummary);
        $rootScope.$on(EVENTS.SERVICE_STARTING, _refreshServicesCountSummary);

    }]);
