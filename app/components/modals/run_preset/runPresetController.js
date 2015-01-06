'use strict';

angular.module('swamp.controllers').controller('runPresetController', [

  '$scope',
  '$payload',
  'modalService',
  'swampManager',

  function ($scope, $payload, modalService, swampManager) {

    $scope.preset = $payload;

    $scope.applyChanges = function () {

      modalService.close($scope.preset);

    };

    $scope.cancel = function () {

      modalService.dismiss();

    };

    $scope.deletePreset = function () {

      swampManager.deletePreset($scope.preset.id);

      modalService.dismiss();
    }
  }]);
