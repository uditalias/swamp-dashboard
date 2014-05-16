'use strict';

angular.module('swamp.controllers').controller('mainController', ['$scope', '$rootScope', 'EVENTS', 'fullScreenMessage',
    function($scope, $rootScope, EVENTS, fullScreenMessage) {

        $scope.footerOpen = false;

        function _onFooterPanelStateChange(event, state) {
            $scope.footerOpen = !state;
        }

        function _onSwampDisconnected(event) {

            fullScreenMessage.open({
                templateUrl: 'components/disconnect_message/disconnectMessage.html',
                controller: 'disconnectMessageController'
            });

        }

        $rootScope.$on(EVENTS.FOOTER_PANEL_STATE_CHANGE, _onFooterPanelStateChange);
        $rootScope.$on(EVENTS.SWAMP_DISCONNECTED, _onSwampDisconnected);
    }]);