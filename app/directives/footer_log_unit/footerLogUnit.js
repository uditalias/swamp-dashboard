'use strict';
angular.module('swamp.directives').directive('swFooterLogUnit', [function() {
    return {
        restrict: 'E',
        scope: {
            tab: '=ngModel',
            height: '=unitHeight'
        },
        templateUrl: 'directives/footer_log_unit/footerLogUnit.html',
        link: function($scope, $element, $attrs) {

            $scope.pauseTabLog = function() {

                $scope.tab.paused = !$scope.tab.paused;

                if($scope.tab.paused) {

                    $scope.tab.content.freeze();

                } else {

                    $scope.tab.content.unfreeze();

                }
            }

        }
    }
}]);