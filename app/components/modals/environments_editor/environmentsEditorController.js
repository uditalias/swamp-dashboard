"use strict";

angular.module('swamp.controllers').controller('environmentsEditorController', ['$scope', '$payload', 'swampServicesManager', 'modalService',
    function($scope, $payload, swampServicesManager, modalService) {

        $scope.handler = {
            isEnvMenuOpen: false,
            selectedEnvironment: {},
            addedVariable: { key: '', value: ''},
            showAddVariable: false
        };
        $scope.service = $payload;
        $scope.serviceEnvironments = _.cloneDeep($payload.environments);
        $scope.editedEnvironment = '';
        $scope.editedVariable = '';

        $scope.loadEnvironment = function(environmentName) {

            $scope.editedVariable = '';
            $scope.editedEnvironment = environmentName;

        };

        $scope.editEnvironmentVariable = function(key, value) {

            $scope.editedVariable = key;

        };

        $scope.addVariable = function() {

            _resetAddedVariable();

            _toggleAddedVariable();

        };

        $scope.saveVariable = function($event) {

            $event.stopPropagation();

            var key = $scope.handler.addedVariable.key;
            var value = $scope.handler.addedVariable.value;

            $scope.handler.selectedEnvironment[key] = value;

            _toggleAddedVariable();

            _resetAddedVariable();

        };

        $scope.removeVariable = function($event, key) {

            $event.stopPropagation();

            delete $scope.handler.selectedEnvironment[key];

        };

        $scope.undoVariableEdit = function($event, key) {

            $event.stopPropagation();

            $scope.handler.selectedEnvironment[key] = $scope.service.environments[$scope.editedEnvironment][key];

            $scope.editedVariable = '';
        };


        function _toggleAddedVariable() {

            $scope.handler.showAddVariable = !$scope.handler.showAddVariable;

        }

        function _resetAddedVariable() {

            $scope.handler.addedVariable = { key: '', value: ''};

        }

        if($scope.service.selectedEnvironment) {

            $scope.loadEnvironment($scope.service.selectedEnvironment);

        }

        $scope.close = function() {

            modalService.close();

        };

        $scope.save = function(restart) {

            swampServicesManager.modifyServiceEnvironments($scope.service.name, $scope.serviceEnvironments, restart);

            $scope.close();

        };
    }]);