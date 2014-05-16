"use strict";

angular.module('swamp.directives').directive('swFullScreenMessage', ['$rootScope', 'EVENTS', '$compile',
    function($rootScope, EVENTS, $compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/full_screen_message/fullScreenMessage.html',
            transclude: true,
            link: function($scope, $element, $attrs) {

            }
        }
    }]);