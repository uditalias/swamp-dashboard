'use strict';
angular.module('swamp.directives').directive('swContextMenu', ['$rootScope', 'EVENTS', function($rootScope, EVENTS) {
    return {
        restrict: 'A',
        scope: {
            $payload: '=swContextMenu'
        },
        compile: function() {

            var _menuTemplate       = '<div class="sw-context-menu"><ul></ul></div>',
                _submenuTemplate    = '<div class="sw-sub-context-menu"><ul></ul></div>',
                _itemTemplate       = '<li></li>';

            return function($scope, $element, $attrs) {

                var $menu = null;

                function _createContextMenu() {

                    var menuItems = $scope.$payload.getContextMenu();

                    $menu = $(_menuTemplate);

                    _.forEach(menuItems, function(item) {

                        var $item = $(_itemTemplate);

                        $item.text(item.title);

                        if(item.command instanceof Array) {

                            $item.addClass('sub-menu-container');

                            var $subMenu = $(_submenuTemplate);

                            _.forEach(item.command, function(subitem) {

                                var $subitem = $(_itemTemplate);

                                $subitem.text(subitem.title);

                                $subitem.on('click', _onItemClick.bind($scope.$payload, subitem));

                                if(subitem.disabled) {
                                    $subitem.addClass('disabled');
                                }

                                $subMenu.find('ul').append($subitem);

                            });

                            $item.append($subMenu);

                        } else if(typeof item.command === 'function') {

                            $item.on('click', _onItemClick.bind($scope.$payload, item));

                            if(item.disabled) {
                                $item.addClass('disabled');
                            }

                        }

                        $menu.find('>ul').append($item);

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

                    $(document).off('click', _onBodyClick);
                }

                function _onContextMenu(e) {

                    $rootScope.$broadcast(EVENTS.DISPOSE_CONTEXT_MENUS);

                    e.preventDefault();
                    e.stopPropagation();

                    var _X = e.pageX;
                    var _Y = e.pageY;

                    _createContextMenu();

                    _positionContextMenu(_Y, _X);

                    $(document).on('click', _onBodyClick);

                }

                function _onBodyClick(e) {

                    if($menu) {

                        _disposeContextMenu();

                    }
                }

                $element.on('contextmenu', _onContextMenu);

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
