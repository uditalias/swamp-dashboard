'use strict';

angular.module('swamp.directives').directive('swVerticalScroller', ['$timeout', '$rootScope', 'EVENTS', function($timeout, $rootScope, EVENTS) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {

            var arrow               = '<div class="sw-scroller-arrow flex flex-align-center"></div>',
                $leftArrow          = $(arrow).addClass('sw-left-arrow'),
                $rightArrow         = $(arrow).addClass('sw-right-arrow'),
                vscrollBindFn       = null,
                arrowJumpSpace      = 100,
                itemSelector        = $attrs.itemSelector,
                wrapperPosition     = $attrs.wrapperPosition || 'top',
                $wrapper            = $element.find('.sw-vertical-scroller-wrapper');

            function _getChildrenTotalWidth() {

                var width = 0;

                $wrapper.children(itemSelector).each(function() {

                    var margin = parseInt($(this).css('margin-right')) + parseInt($(this).css('margin-left'));

                    width += ($(this).outerWidth() + margin);

                });

                return width;

            }

            function _calculateDimensions() {

                $timeout(function() {

                    var wrapperWidth = _getChildrenTotalWidth();
                    var wrapperHeight = $wrapper.find(itemSelector).outerHeight();

                    $wrapper.css({ 'width': wrapperWidth + 'px', 'height': wrapperHeight + 'px' });
                    $wrapper.css(wrapperPosition, 0);

                    var padding = parseInt($element.css('padding-top')) + parseInt($element.css('padding-bottom'));

                    $element.css('height', (wrapperHeight + padding) + 'px');

                });

            }

            function _appendArrows() {

                $leftArrow.appendTo($element);
                $rightArrow.appendTo($element);

            }

            function _left() {
                var currentLeft = parseInt($wrapper.css('left'));

                var newLeft = currentLeft + arrowJumpSpace;

                if(newLeft > 0) {
                    newLeft = 0;
                }

                $wrapper.css('left', newLeft);
            }

            function _right() {

                var currentLeft = parseInt($wrapper.css('left'));

                var newLeft = currentLeft - arrowJumpSpace;

                if($wrapper.outerWidth() - Math.abs(newLeft) < $element.outerWidth()) {
                    newLeft = ($wrapper.outerWidth() - $element.outerWidth()) * -1;
                }

                $wrapper.css('left', newLeft);
            }

            function _bindEvents() {
                $leftArrow.on('mousedown', _left);
                $rightArrow.on('mousedown', _right);
            }

            function _unbindEvents() {
                $leftArrow.off('mousedown', _left);
                $rightArrow.off('mousedown', _right);

                vscrollBindFn && vscrollBindFn();
            }

            function _onVerticalScrollIntoView(event, selector) {

                var $el = $wrapper.find(selector);

                if($el.length) {

                    var offset = $el.offset();

                    if(offset.left < 0) {

                        var currentLeft = parseInt($wrapper.css('left'));

                        var newLeft = currentLeft + Math.abs(offset.left);

                        $wrapper.css('left', newLeft);

                    } else if(offset.left + $el.outerWidth() > $element.outerWidth()) {
                        var currentLeft = parseInt($wrapper.css('left'));

                        var newLeft = currentLeft - Math.abs(offset.left);

                        if(newLeft - $wrapper.outerWidth() < $element.outerWidth()) {
                            newLeft = ($wrapper.outerWidth() - $element.outerWidth()) * -1;
                        }

                        $wrapper.css('left', newLeft);

                    }

                }

            }

            _calculateDimensions();
            _appendArrows();
            _bindEvents();

            $scope.$on('$destroy', function() {
                _unbindEvents();
                $element.remove();
            });

            vscrollBindFn = $rootScope.$on(EVENTS.VERTICAL_SCROLL_INTO_VIEW, _onVerticalScrollIntoView)

        }
    }
}]);