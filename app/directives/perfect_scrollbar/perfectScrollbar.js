'use strict';

angular.module('swamp.directives').directive('swPerfectScrollbar', ['$parse', function($parse) {
    return {
        restrict: 'A',
        priority: 100,
        link: function($scope, $elem, $attr) {

            var updateInterval              = 500,
                displayScrollBarInterval    = null,
                isVisible                   = false;

            $elem.perfectScrollbar({
                wheelSpeed: $parse($attr.wheelSpeed)() || 50,
                wheelPropagation: $parse($attr.wheelPropagation)() || false,
                minScrollbarLength: $parse($attr.minScrollbarLength)() || false,
                suppressScrollX: $parse($attr.suppressScrollX)() || false,
                suppressScrollY: $parse($attr.suppressScrollY)() || false
            });

            if($attr.scrollPositionOutside) {
                var paddingRight = parseInt($elem.css('padding-right'));
                var marginRight = parseInt($elem.css('margin-right'));

                $elem.css('padding-right', (paddingRight + 15) + 'px');
                $elem.css('margin-right', (marginRight - 15) + 'px');
            }

            function displayScrollbar() {
                displayScrollBarInterval = setTimeout(function() {
                    if($elem.is(':visible')) {
                        isVisible = true;
                        $elem.find('.ps-scrollbar-x-rail, .ps-scrollbar-y-rail').css({ 'display': 'block', 'opacity': '0.9' });
                        $elem.perfectScrollbar('update');
                    }

                    !isVisible && displayScrollbar();

                }, updateInterval);
            }

            if($attr.scrollDisplayed) {
                displayScrollbar();
            }

            $elem.find($attr.refreshOnChange).resize(function(){
                $elem.scrollTop(0).perfectScrollbar('update');
            });

            $scope.updateScroll = function() {
                $elem.scrollTop(0).perfectScrollbar('update');
            }

            $scope.$on('$destroy', function() {
                $elem.perfectScrollbar('destroy');
                $elem.remove();
                $elem = null;
            });
        }
    }
}]);