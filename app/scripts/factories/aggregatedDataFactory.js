"use strict";

angular.module('swamp.services').factory('aggregatedDataFactory', ['AGGREGATED_LIST_TYPE', function(AGGREGATED_LIST_TYPE) {

    function AggregatedData(type, maxItems) {

        this.type = type || AGGREGATED_LIST_TYPE.FIFO;
        this.maxItems = maxItems || 0;

        this._data = [];
    }

    AggregatedData.prototype = {

        add: function(item) {

            this._data.push(item);

            if(this.maxItems > 0 && this.count() > this.maxItems) {
                this._automatedRemove();
            }

        },

        remove: function(index) {

            this._data.splice(index, 1);

        },

        clear: function() {

            this._data.length = 0;

        },

        count: function() {

            return this._data.length;

        },

        _automatedRemove: function() {
            switch(this.type) {
                case AGGREGATED_LIST_TYPE.FIFO:
                    this.remove(this.count() - 1);
                    break;
                case AGGREGATED_LIST_TYPE.LIFO:
                    this.remove(0);
                    break;
            }
        }

    };

    function _create(type, maxItems) {

        return new AggregatedData(type, maxItems);

    };

    return {
        create: _create
    }

}]);