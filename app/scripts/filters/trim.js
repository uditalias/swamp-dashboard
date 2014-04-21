'use strict';

angular.module('swamp.filters').filter('trim',[ function () {
    return function (input, size, tooltip) {
        size = size || 220;
        if (input !== null && input !== undefined) {
            if (input.length >= size) {
                return [
                    input.substring(0, size),
                    '...'
                ].join('');
            } else {
                return input;
            }
        }
    };
}]);