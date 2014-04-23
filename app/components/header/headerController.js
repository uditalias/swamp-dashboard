'use strict';

angular.module('swamp.controllers').controller('headerController', ['$scope', '$rootScope', 'EVENTS',
    function($scope, $rootScope, EVENTS) {

        $scope.handler = {
            pageScrolled: false,
            serviceQuery: ''
        }

        $scope.onPageScrolled = function(state) {

            $scope.handler.pageScrolled = state;

        }

        $scope.clearFilter = function() {

            $scope.handler.serviceQuery = '';

        }

        $scope.$watch(function() {

            return $scope.handler.serviceQuery;

        }, function(newVal) {

            $rootScope.$broadcast(EVENTS.SERVICES_FILTER_CHANGE, newVal);

        });

    }]);