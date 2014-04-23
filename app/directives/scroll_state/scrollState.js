'use strict';

angular.module('swamp.directives').directive('swScrollState', ['EVENTS',
    function(EVENTS) {
        return {
            restrict: 'A',
            scope: {
                onScroll: '&onPageScroll'
            },
            link: function($scope, $element, $attrs) {

                var offset = $attrs.scrollOffset ? parseInt($attrs.scrollOffset) : 100,
                    currentScrollState = false;

                function _onWindowScroll() {

                    var newState = window.scrollY > offset;

                    if(newState != currentScrollState) {
                        $scope.onScroll && $scope.onScroll({ state: newState });

                        currentScrollState = newState;
                    }
                }

                $(window).on('scroll', _onWindowScroll);

                $scope.$on('$destroy', function() {
                    $(window).off('scroll', _onWindowScroll);
                });

            }
        }
    }]);