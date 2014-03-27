'use strict';

angular.module('swamp.controllers').controller('headerController', ['$scope', 'swampServicesManager',
    function($scope, swampServicesManager) {


        $scope.restartAll = function() {
            swampServicesManager.restartAllRunningServices();
        }



        $scope.stopAll = function() {
            swampServicesManager.stopAllRunningServices();
        }


    }]);