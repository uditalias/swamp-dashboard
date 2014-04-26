'use strict';

angular.module('swamp.directives').directive('swCheckbox', [function() {
    return {
        restrict: 'E',
        scope: {
            checked: '=ngModel',
            label: '=checkboxLabel',
            onCheckStateChange: '&'
        },
        templateUrl: 'directives/checkbox/checkbox.html',
        link: function($scope, $element, $attrs) {

            if($scope.onCheckStateChange){

                $scope.$watch(function() {

                    return $scope.checked;

                }, function(newVal) {

                    $scope.onCheckStateChange({ state: newVal });

                });

            }

        }
    };
}])