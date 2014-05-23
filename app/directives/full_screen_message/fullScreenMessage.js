"use strict";

angular.module('swamp.directives').directive('swFullScreenMessage', ['$rootScope', 'EVENTS',
    function($rootScope, EVENTS) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/full_screen_message/fullScreenMessage.html',
            transclude: true,
            link: function($scope, $element, $attrs) {

            }
        }
    }]);