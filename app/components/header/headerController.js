'use strict';

angular.module('swamp.controllers').controller('headerController', ['$scope', '$rootScope', 'EVENTS', 'authApiService', 'swampManager',
    function($scope, $rootScope, EVENTS, authApiService, swampManager) {

        $scope.handler = {
            pageScrolled: false,
            serviceQuery: '',
            info: swampManager.getInfo()
        };

        $scope.onPageScrolled = function(state) {

            $scope.handler.pageScrolled = state;

        };

        $scope.clearFilter = function() {

            $scope.handler.serviceQuery = '';

        };

        $scope.logout = function() {

            authApiService.logout();

        };

        $scope.$watch(function() {

            return $scope.handler.serviceQuery;

        }, function(newVal) {

            $rootScope.$broadcast(EVENTS.SERVICES_FILTER_CHANGE, newVal);

        });

    }]);
