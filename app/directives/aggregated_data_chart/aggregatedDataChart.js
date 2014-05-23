'use strict';

angular.module('swamp.directives').directive('swAggregatedDataChart', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            model: '=ngModel',
            minValue: '=',
            maxValue: '=',
            maxItems: '=',
            lineColor: '@',
            formatValue: '&',
            hideData: '=showNaMessage'
        },
        replace: true,
        templateUrl: 'directives/aggregated_data_chart/aggregatedDataChart.html',
        link: function($scope, $element, $attrs) {

            var itemTpl         = '<li tooltip="{{label}}" tooltip-append-to-body="true" class="flex flex-align-end"><div class="chart-bar {{itemCssClass}}"></div></li>';
            var noDataTpl       = '<div class="no-data-container flex flex-align-center flex-pack-center text-30">N/A</div>';
            var minValue        = $scope.minValue ? parseInt($scope.minValue) : 0;
            var maxValue        = $scope.maxValue ? parseInt($scope.maxValue) : 100;
            var maxItems        = $scope.maxItems ? parseInt($scope.maxItems) : -1;
            var lineColor       = $scope.lineColor ? '#' + $scope.lineColor : '#ffffff';
            var itemCssClass    = $attrs.itemCssClass || '';

            var $ul = $element.find('ul');

            $scope.dataItems = $scope.model.getAll();

            function _insertItem(value) {

                var scope = $scope.$new(true);

                var label = $scope.formatValue && $scope.formatValue({ value: value }) || '';

                scope.label = label;
                scope.itemCssClass = itemCssClass;

                var $li = $compile(itemTpl)(scope);

                var $el = $li.find('.chart-bar');

                var height = (value / maxValue) * 100;

                $el.css('border-color', lineColor);
                $el.css('height', (height) + '%');
                $el.css('background-color', lineColor);

                $ul.append($li);

                if(maxItems > -1 && $ul.find('li').length > maxItems) {
                    $ul.find('li').first().remove();
                }

                $ul.css('width', $ul.find('li').length * 20);

            }

            $scope.$watchCollection('dataItems', function() {

                var newValue = $scope.model.getLast();

                if(newValue != false && newValue !== undefined) {
                    _insertItem(newValue);
                }

            });

            $scope.$watch(function() {

                return $scope.hideData;

            }, function(newValue) {
                if(newValue) {

                    $element.append(noDataTpl);

                } else {

                    $element.find('.no-data-container').remove();

                }
            });

            $scope.$on('$destroy', function() {
                $element.empty();
                $element.remove();
                $element = null;
            });

            (function initialize() {

                _.forEach($scope.dataItems, function(value) {

                    if(value != false && value !== undefined) {
                        _insertItem(value);
                    }

                });

            })();

        }
    }
}]);