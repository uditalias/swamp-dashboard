"use strict";

angular.module('swamp.services').factory('aggregatedDataFactory', ['AGGREGATED_LIST_TYPE', '$rootScope', function(AGGREGATED_LIST_TYPE, $rootScope) {

    function AggregatedData(type, maxItems) {

        this.id = _.guid();
        this.type = type || AGGREGATED_LIST_TYPE.FIFO;
        this.maxItems = maxItems || 0;

        this._freezed = false;
        this._queuedData = [];
        this._data = [];
    }

    AggregatedData.prototype = {

        add: function(item) {

            if(this._freezed) {

                this._queuedData.push(item);

            } else {

                this._data.push(item);

                if(this.maxItems > 0 && this.count() > this.maxItems) {
                    return this._automatedRemove();
                }

                $rootScope.$safeApply();
            }

        },

        remove: function(index) {

            this._data.splice(index, 1);

            $rootScope.$safeApply();

        },

        get: function(index) {

            return this._data[index];

        },

        getAll: function() {

            return this._data;

        },

        clear: function() {

            this._data.length = 0;

            $rootScope.$safeApply();

        },

        toggleFreeze: function() {

            if(this._freezed) {

                this.unfreeze();

            } else {

                this.freeze();

            }

        },

        freeze: function() {
            if(!this._freezed) {

                this._freezed = true;

            }
        },

        unfreeze: function() {
            if(this._freezed) {

                this._freezed = false;

                _.pushAll(this._data, this._queuedData);

                this._queuedData.length = 0;
            }
        },

        count: function() {

            return this._data.length;

        },

        getLast: function() {
            return this.get(this.count() - 1);
        },

        _automatedRemove: function() {
            switch(this.type) {
                case AGGREGATED_LIST_TYPE.FIFO:
                    this.remove(0);
                    break;
                case AGGREGATED_LIST_TYPE.LIFO:
                    this.remove(this.count() - 1);
                    break;
            }
        }

    };

    function _create(type, maxItems) {

        return new AggregatedData(type, maxItems);

    }

    return {
        create: _create
    }

}]);