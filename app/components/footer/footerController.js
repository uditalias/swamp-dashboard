'use strict';

angular.module('swamp.controllers').controller('footerController', ['$scope', '$rootScope', 'EVENTS', 'swampManager', 'swampServicesManager',
    function($scope, $rootScope, EVENTS, swampManager, swampServicesManager) {

        $scope.handler = {
            collapsed: true,
            initializing: true,
            title: '',
            maximized: false,
            panelContentHeight: 300
        };
        $scope.tabsContent = [];

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

        }

        function _initializeSwampTabs() {

            $scope.tabsContent.push({
                id: swampManager.outLogData.id,
                active: true,
                tailed: false,
                itemcls: 'color-green',
                name: 'Swamp out log',
                content: swampManager.outLogData
            });

            $scope.tabsContent.push({
                id: swampManager.errorLogData.id,
                active: false,
                tailed: false,
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
                    tailed: false,
                    itemcls: 'color-green',
                    name: service.name + ' out log',
                    content: service.outLogData
                });

                $scope.tabsContent.push({
                    id: service.errorLogData.id,
                    active: false,
                    tailed: false,
                    itemcls: 'color-red',
                    name: service.name + ' error log',
                    content: service.errorLogData
                });

            });

            $scope.handler.initializing = false;
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


    }]);