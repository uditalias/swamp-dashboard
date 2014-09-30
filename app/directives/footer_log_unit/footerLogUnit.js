'use strict';
angular.module('swamp.directives').directive('swFooterLogUnit', ['$sce', function($sce) {
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
            };

            $scope.parseAnsi = function(raw) {
                console.log(1)
                var ansi = _.ansi(raw);
                raw = '';
                for(var i = 0, len = ansi.length; i < len; i++) {
                    if(ansi[i].foreground) {
                        raw += '<span style="color:' + ansi[i].foreground + '">' + ansi[i].text + '</span>';
                        continue;
                    }
                    raw += ansi[i].text;
                }

                return $sce.trustAsHtml(raw);
            };

            $scope.$on('$destroy', function() {
                $element.empty();
                $element.remove();
                $element = null;
            });

        }
    }
}]);