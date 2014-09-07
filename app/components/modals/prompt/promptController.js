'use strict';
angular.module('swamp.controllers').controller('promptController', ['$scope', '$payload', 'modalService', function($scope, $payload, modalService) {

    $scope.name = $payload.name;
    $scope.action = $payload.action;

    $scope.dismiss = function() {
        modalService.dismiss();
    }

    $scope.confirm = function() {
        modalService.close();
    }

}]);