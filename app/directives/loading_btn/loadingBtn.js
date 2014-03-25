"use strict";

app.module('swamp.directives').directive('swLoadingBtn', [function() {
    return {
        restrict: 'A',
        scope: {
            loading: '=btnLoading'
        },
        link: function($scope, $elem, $attrs) {

        }
    }
}]);