'use strict';
angular.module('swamp.directives').directive('swContextMenu', ['$rootScope', 'EVENTS', function($rootScope, EVENTS) {
    return {
        restrict: 'A',
        scope: {
            $payload: '=swContextMenu'
        },
        compile: function() {

            var _menuTemplate   = '<div class="sw-context-menu"><ul></ul></div>',
                _itemTemplate   = '<li></li>';

            return function($scope, $element, $attrs) {

                var $menu = null;

                function _createContextMenu() {

                    var menuItems = $scope.$payload.getContextMenu();

                    $menu = $(_menuTemplate);

                    _.forEach(menuItems, function(item) {

                        var $item = $(_itemTemplate);

                        $item.text(item.title);

                        $item.on('click', _onItemClick.bind($scope.$payload, item));

                        if(item.disabled) {
                            $item.addClass('disabled');
                        }

                        $menu.find('ul').append($item);

                    });

                }

                function _onItemClick(item, e) {

                    e.stopPropagation();

                    if(item.disabled) {
                        return;
                    }

                    item.command && item.command();

                    _disposeContextMenu();

                    $rootScope.$safeApply();

                }

                function _positionContextMenu(top, left) {

                    if($menu) {

                        $menu.css({ 'top': top, 'left': left });

                        $menu.appendTo(document.body);

                    }

                }

                function _disposeContextMenu() {

                    if($menu) {

                        $menu.find('ul li').each(function() {

                            $(this).off();

                        });

                        $menu.remove();
                        $menu = null;
                    }
                }

                function _onContextMenu(e) {

                    $rootScope.$broadcast(EVENTS.DISPOSE_CONTEXT_MENUS);

                    e.preventDefault();
                    e.stopPropagation();

                    var _X = e.pageX;
                    var _Y = e.pageY;

                    _createContextMenu();

                    _positionContextMenu(_Y, _X);

                }

                function _onBodyClick(e) {

                    if($menu) {

                        _disposeContextMenu();

                    }
                }

                $element.on('contextmenu', _onContextMenu);

                $(document).on('click', _onBodyClick)

                $scope.$on('$destroy', function() {

                    $element.off('contextmenu', _onContextMenu);

                    $(document).off('click', _onBodyClick);

                    _disposeContextMenu();

                });

                $rootScope.$on(EVENTS.DISPOSE_CONTEXT_MENUS, _disposeContextMenu);
            }
        }
    }
}]);