'use strict';
angular.module('swamp.controllers').controller('executeCommandPromptController', ['$scope', '$payload', 'modalService', function($scope, $payload, modalService) {

  $scope.service = $payload.service;
  $scope.command = $payload.command;

  $scope.dismiss = function() {
    modalService.dismiss();
  }

  $scope.confirm = function() {
    modalService.close();
  }

}]);
