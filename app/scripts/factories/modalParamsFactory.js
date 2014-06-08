"use strict";

angular.module('swamp.services').factory('modalParamsFactory', ['MODAL_CONFIG', function(MODAL_CONFIG) {

    var _defaultConfig = {
        templateUrl: '',
        controller: ''
    }

    function ModalParams(type, payload) {

        this.resolve = {};

        this._type = type;
        this._payload = payload;

        this.initialize();

    }

    ModalParams.prototype = {

        initialize: function() {

            var self = this;

            var conf = MODAL_CONFIG[this._type] || _defaultConfig;

            _.forEach(conf, function(value, key) {

                this[key] = value;

            }.bind(this));

            this.resolve['$payload'] = [function() {

                return self._payload;

            }];

        }

    };

    function _create(type, payload) {

        return new ModalParams(type, payload);

    }

    return {
        create: _create
    }

}]);