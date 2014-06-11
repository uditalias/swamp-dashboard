"use strict";

angular.module('swamp.services').service('modalService', ['$modal', 'MODAL_TYPE', 'modalParamsFactory', function($modal, MODAL_TYPE, modalParamsFactory) {

    var _currentInstance = null;

    this.open = function(type, payload) {

        this.close();

        var modalParams = modalParamsFactory.create(type, payload);

        _currentInstance = $modal.open(modalParams);

        return _currentInstance;

    }

    this.dismiss = function(data) {

        if(_currentInstance && _currentInstance.dismiss) {

            _currentInstance.dismiss(data);

            _currentInstance = null;

        }

    }

    this.close = function(data) {

        if(_currentInstance && _currentInstance.close) {
            try {
                _currentInstance.close(data);
            }
            catch(e) {}
            finally {
                _currentInstance = null;
            }
        }
    }

}]);