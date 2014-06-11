"use strict";

angular.module('swamp.directives').directive('swModalContent', ['modalService', function(modalService) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'directives/modal_content/modalContent.html',
        scope: {
            title: '=modalTitle'
        },
        link: function($scope, $element, $attrs) {

            $scope.dismiss = function() {
                modalService.dismiss();
            }


            function _onDestroy() {

            }

            $scope.$on('$destroy', _onDestroy);

        }
    }
}]);