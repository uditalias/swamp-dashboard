'use strict';

angular.module('swamp.controllers').controller('createPresetController', [

  '$scope',
  'swampServicesManager',
  'SERVICE_STATE',
  'modalService',

  function ($scope, swampServicesManager, SERVICE_STATE, modalService) {

    $scope.presetParams = {
      name: '',
      services: _.pluck(_.where(swampServicesManager.getAll(), { state: SERVICE_STATE.RUN }), 'name')
    };

    $scope.create = function () {

      modalService.close($scope.presetParams);

    };

    $scope.cancel = function () {

      modalService.dismiss();

    };

  }]);
