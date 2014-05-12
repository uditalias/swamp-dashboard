'use strict';

angular.module('swamp.directives').directive('swScroll', [function() {
    return {
        restrict: 'A',
        scope: {
            swScroll: '&',
            autoScrollBottom: '='
        },
        link: function($scope, $elem, $attrs) {

            var currentScrollPos    = $elem.scrollTop(),
                updateInterval      = 100,
                elementHeight       = $elem.height(),
                scrollInt           = null,
                scrollBottomInt     = null;

            function _onElementScroll() {

                if(scrollInt) {
                    clearTimeout(scrollInt);
                }

                scrollInt = setTimeout(function() {
                    if(currentScrollPos != $elem.scrollTop()) {
                        $scope.swScroll && $scope.swScroll();
                    }

                    currentScrollPos = $elem.scrollTop();
                }, 500);

            }

            function _tailElement() {
                scrollBottomInt = setTimeout(function() {

                    $elem.scrollTop($elem.outerHeight());

                    _tailElement();
                }, updateInterval);
            }

            function _untailElement() {
                clearTimeout(scrollBottomInt);
                scrollBottomInt = null;
            }

            function autoScrollBottom(scroll) {
                if(scroll) {
                    $elem.scrollTop($elem.outerHeight());
                    _tailElement();
                } else {
                    _untailElement();
                }
            }

            $scope.$watch(function() { return $scope.autoScrollBottom; }, function(newVal) {
                autoScrollBottom(newVal);
            });

            $elem.on('scroll', _onElementScroll);

        }
    }
}]);