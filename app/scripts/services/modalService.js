"use strict";

angular.module('swamp.services').service('modalService', ['$modal', 'MODAL_TYPE', 'modalParamsFactory', function($modal, MODAL_TYPE, modalParamsFactory) {

    var _currentInstance = null;

    this.open = function(type, payload) {

        var modalParams = modalParamsFactory.create(type, payload);

        _currentInstance = $modal.open(modalParams);

    }

    this.close = function() {

        if(_currentInstance) {

            _currentInstance.close();

            _currentInstance = null;

        }
    }

}]);