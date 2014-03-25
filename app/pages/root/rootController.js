'use strict';

angular.module('swamp.controllers').controller('rootController', ['$scope', 'swampServicesManager', function($scope, swampServicesManager) {

    $scope.services = swampServicesManager.getAll();

}]);