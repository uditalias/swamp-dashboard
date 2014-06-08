'use strict';

angular.module('swamp.directives').directive('swFocusBool', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.swFocusBool, function (value) {
                if (value) {
                    $timeout(function() {
                        element.focus();
                    });
                }
            });
        }
    };
}]);