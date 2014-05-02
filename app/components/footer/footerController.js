'use strict';

angular.module('swamp.controllers').controller('footerController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager', '$timeout',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager, $timeout) {

        $scope.handler = {
            collapsed: true,
            initializing: true,
            title: '',
            maximized: false,
            panelContentHeight: 300,
            swampVersion: window.swampVersion
        };
        $scope.tabsContent = [];

        var tailAllLogsState = false;

        $scope.setActive = function(id) {

            _.forEach($scope.tabsContent, function(tab) {

                tab.active = id == tab.id;

                if(tab.active) {

                    $scope.handler.title = tab.name;

                }
            });
        }

        $scope.toggleView = function() {
            if($scope.handler.maximized) {

                $(window).off('resize', _setPanelMaxHeight);

                $scope.handler.panelContentHeight = 300;

            } else {

                _setPanelMaxHeight();

                $(window).on('resize', _setPanelMaxHeight);

            }

            $scope.handler.maximized = !$scope.handler.maximized;
        }

        function _setPanelMaxHeight() {
            $scope.handler.panelContentHeight = _getPanelMaxHeight();
        }

        function _getPanelMaxHeight() {
            return $(window).innerHeight() - 64;
        }

        function _setTitle() {

            var tab = _.where($scope.tabsContent, { active: true });

            $scope.handler.title = tab[0].name;

        }

        function _onOpenFooterPanelRequest(event, panelId) {

            $scope.setActive(panelId);

            $scope.handler.collapsed = false;

            $timeout(function() {

                $rootScope.$broadcast(EVENTS.VERTICAL_SCROLL_INTO_VIEW, '#tab_item_' + panelId);

            }, 10);

        }

        function _initializeSwampTabs() {

            $scope.tabsContent.push({
                id: swampManager.outLogData.id,
                active: true,
                tailed: tailAllLogsState,
                itemcls: 'color-green',
                name: 'Swamp out log',
                content: swampManager.outLogData
            });

            $scope.tabsContent.push({
                id: swampManager.errorLogData.id,
                active: false,
                tailed: tailAllLogsState,
                itemcls: 'color-red',
                name: 'Swamp error log',
                content: swampManager.errorLogData
            });

            $scope.handler.initializing = false;
        }

        function _initializeSwampServicesTabs() {
            _.forEach(swampServicesManager.getAll(), function(service) {

                $scope.tabsContent.push({
                    id: service.outLogData.id,
                    active: false,
                    tailed: tailAllLogsState,
                    itemcls: 'color-green',
                    name: service.name + ' out log',
                    content: service.outLogData
                });

                $scope.tabsContent.push({
                    id: service.errorLogData.id,
                    active: false,
                    tailed: tailAllLogsState,
                    itemcls: 'color-red',
                    name: service.name + ' error log',
                    content: service.errorLogData
                });

            });

            $scope.handler.initializing = false;
        }

        function _onTailLogsStateCahnge(event, state) {

            tailAllLogsState = state;

            _.forEach($scope.tabsContent, function(tabContent) {

                tabContent.tailed = state;

            });
        }

        $scope.$watch(function() {
            return $scope.handler.collapsed;
        }, function(newVal) {
            if(newVal) {
                $scope.handler.title = '';
            } else {
                _setTitle();
            }
            $rootScope.$broadcast(EVENTS.FOOTER_PANEL_STATE_CHANGE, newVal);
        });

        $rootScope.$on(EVENTS.OPEN_FOOTER_PANEL, _onOpenFooterPanelRequest)
        $rootScope.$on(EVENTS.SWAMP_MANAGER_INITIALIZED, _initializeSwampTabs);
        $rootScope.$on(EVENTS.SWAMP_SERVICES_MANAGER_INITIALIZED, _initializeSwampServicesTabs);
        $rootScope.$on(EVENTS.TAIL_LOGS_STATE_CHANGE, _onTailLogsStateCahnge);


    }]);