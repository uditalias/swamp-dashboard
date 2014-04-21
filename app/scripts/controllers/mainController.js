'use strict';

angular.module('swamp.controllers').controller('mainController', ['$scope', '$rootScope', 'EVENTS',
    function($scope, $rootScope, EVENTS) {

        $scope.footerOpen = false;

        function _onFooterPanelStateChange(event, state) {
            $scope.footerOpen = !state;
        }

        $rootScope.$on(EVENTS.FOOTER_PANEL_STATE_CHANGE, _onFooterPanelStateChange);
    }]);