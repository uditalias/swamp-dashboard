'use strict';

angular.module('swamp.controllers').controller('rootController', [
    '$scope', '$rootScope', 'swampServicesManager', 'swampManager', 'SERVICE_STATE', 'EVENTS',
    function($scope, $rootScope, swampServicesManager, swampManager, SERVICE_STATE, EVENTS) {

        $scope.handler = {
            servicesFilter: '',
            orderBy: 'name',
            orderByDir: '',
            filteredServices: [],
            isLoading: true
        }

        $scope.SERVICE_STATE = SERVICE_STATE;

        $scope.totalSwampMemory = 0;

        $scope.services = [];

        $scope.serviceActions = {
            start: function(service, env) {

                service.start(env);

            },
            stop: function(service) {

                service.stop();

            },
            restart: function(service, env) {

                service.restart(env);

            },
            showServiceOutLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.outLogData.id);

            },
            showServiceErrorLog: function(service) {

                $rootScope.$broadcast(EVENTS.OPEN_FOOTER_PANEL, service.errorLogData.id);

            }
        }

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
            return !isNaN(value) ? value + '%' : '';ß
        }

        function _onServicesFilterChange(event, filter) {

            $scope.handler.servicesFilter = filter;

        }

        function _onSwampServicesManagerInitialized() {

            $scope.totalSwampMemory = swampManager.getInfo().totalmem;

            $scope.services = _.toArray(swampServicesManager.getAll());

            $scope.handler.isLoading = false;

        }

        $rootScope.$on(EVENTS.SERVICES_FILTER_CHANGE, _onServicesFilterChange);
        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _onSwampServicesManagerInitialized);

    }]);